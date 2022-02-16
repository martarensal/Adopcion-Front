import React, {Fragment, useState} from 'react';
import {modifyAnimalSex} from '../client/AnimalApi';
import {sexOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
import HeaderAppbar from '../components/HeaderAppbar';
import AnimalSexPicker from '../components/AnimalSexPicker.js';

var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalSexChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sex: this.props.route.params.sex,
    }
    this.changeAnimalSex = this.changeAnimalSex.bind(this);
  }

  handleChangeAnimalSexResponse(response) {
    console.log('Sexo animal modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.goBack()
  }

  changeAnimalSex(animalSexChangeRequest) {
    let body = {
      newAnimalSex: animalSexChangeRequest,
    };
  
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [body, this.props.route.params.id],
        modifyAnimalSex,
      ).then(this.handleChangeAnimalSexResponse.bind(this));
    });
  }

  render() {
    return (
      <>
        <HeaderAppbar />
        <AnimalSexPicker
          sex={this.state.sex}
          onChange={(sex) => {
            this.setState({sex: sex})}}
        />
        <Button
          style={styles.button}
          color="#ABE009"
          mode="contained"
          dark={true}
          onPress={() => this.changeAnimalSex(this.state.sex) }>
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
