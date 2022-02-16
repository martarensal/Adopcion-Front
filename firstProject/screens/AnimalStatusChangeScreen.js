import React, {Fragment, useState} from 'react';
import {modifyAnimalStatus} from '../client/AnimalApi';
import {statusOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
import HeaderAppbar from '../components/HeaderAppbar';
import AnimalStatusPicker from '../components/AnimalStatusPicker';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalStatusChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.route.params.status,
    };
    this.changeAnimalStatus = this.changeAnimalStatus.bind(this);
  }

  handleChangeAnimalStatusResponse(response) {
    console.log('Estado animal modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.goBack();
  }

  changeAnimalStatus(animalStatusChangeRequest) {
    console.log(animalStatusChangeRequest);
    console.log(animalStatusChangeRequest);
    this.setState({newValue: animalStatusChangeRequest});

    let body = {
      newAnimalStatus: animalStatusChangeRequest,
    };
    console.log(body);
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [body, this.props.route.params.id],
        modifyAnimalStatus,
      ).then(this.handleChangeAnimalStatusResponse.bind(this));
    });
  }

  render() {
    return (
      <>
        <HeaderAppbar />
        <View style={styles.container}>
          <AnimalStatusPicker
            status={this.state.status}
            onChange={newStatus => {
              this.setState({status: newStatus});
            }}
          />

          <Button
            style={styles.button}
            color="#ABE009"
            mode="contained"
            dark={true}
            onPress={() => this.changeAnimalStatus(this.state.status)}>
            {' '}
            Enviar{' '}
          </Button>
        </View>
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
