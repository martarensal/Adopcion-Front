import React, {Fragment, useState} from 'react';
import {modifyRequestStatus} from '../client/RequestApi';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
import HeaderAppbar from '../components/HeaderAppbar';
import RequestStatusPicker from '../components/RequestStatusPicker.js';
import emailjs from 'emailjs-com';
import {getUser} from '../client/UsersApi';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class RequestStatusChangeScreen extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      phone: '',
      email: '',
      username: '',
      name:'',
      lastnames:'',
      message: undefined,
      userOrigen: {},
      userDestination: {},
      emailDestination: '',
      loading: true,
      status: this.props.route.params.status,
    }
    this.changeRequestStatus = this.changeRequestStatus.bind(this);
  }
   async handleGetUserResponseDestination(response) {
    response.json().then(data => {
      console.log(data);
      this.setState({
        userDestination: data,
        loading: false,
        emailDestination: data.email,
      });
    });
  }
  async handleGetUserResponse(response) {
    response.json().then(data => {
      console.log(data);
      this.setState({
        userOrigen: data,
        loading: false,
        username: data.username,
        phone: data.phone,
        email: data.email,
        name: data.name,
        lastnames: data.lastnames,  
      });
    });
  }

  fetchUserDataOrigen() {
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi([info.sub], getUser).then(
        this.handleGetUserResponse.bind(this),
      );
    });
  }
   fetchUserDataDestination() {
    SecurityUtils.authorizeApi([this.props.route.params.user], getUser).then(
      this.handleGetUserResponseDestination.bind(this),
    );
  }

  handleChangeRequestStatusResponse(response) {
    console.log('Estado de la solicitud modificado');
    console.log(JSON.stringify(response));
    if (response.ok) {
      Alert.alert(
        'Confirmación',
        'La solicitud ha sido creada',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.goBack(),
          },
        ],
        {cancelable: false},
      );

      console.log(JSON.stringify(response));
      console.log('Solicitud modificada');
      emailjs
        .send(
          'service_arm8pjk',
          'template_nal0rxi',
          this.state,
          'user_eOb7ryBtIDgcOWIsaMCgO',
        )
        .then(
          result => {
            console.log(result.text);
          },
          error => {
            console.log(error.text);
          },
        );
    } else {
      console.log(JSON.stringify(response));
      this.setState({isErrorVisible: true});
    }
  
  }

  changeRequestStatus(newRequestStatus) {
    let body = {
      newRequestStatus: newRequestStatus,
    };
  
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [body, this.props.route.params.id],
        modifyRequestStatus,
      ).then(this.handleChangeRequestStatusResponse.bind(this));
    });
  }
   componentDidMount() {
    
    this._unsubscribe = this.props.navigation.addListener(
      'focus',
      this.fetchUserDataOrigen.bind(this),
    );
    this._unsubscribe = this.props.navigation.addListener(
      'focus',
      this.fetchUserDataDestination.bind(this),
    );
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    return (
      <>
        <HeaderAppbar />
        <RequestStatusPicker
          status={this.state.status}
          onChange={(newStatus) => {
            this.setState({status: newStatus})}}
        />
        <Button
          style={styles.button}
          color="#ABE009"
          mode="contained"
          dark={true}
          onPress={() => this.changeRequestStatus(this.state.status) }>
          Enviar
        </Button>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  button: {
    marginTop: 24,
  },
});