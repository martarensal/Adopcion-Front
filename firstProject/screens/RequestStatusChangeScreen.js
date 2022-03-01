import React, {Fragment, useState} from 'react';
import {modifyRequestStatus} from '../client/RequestApi';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
import HeaderAppbar from '../components/HeaderAppbar';
import RequestStatusPicker from '../components/RequestStatusPicker.js';

var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class RequestStatusChangeScreen extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      status: this.props.route.params.status,
    }
    this.changeRequestStatus = this.changeRequestStatus.bind(this);
  }

  handleChangeRequestStatusResponse(response) {
    console.log('Estado de la solicitud modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.goBack()
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