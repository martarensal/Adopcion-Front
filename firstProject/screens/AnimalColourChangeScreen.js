import React, {Fragment, useState} from 'react';
import {modifyAnimalColour} from '../client/AnimalApi';
import {colourOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
import HeaderAppbar from '../components/HeaderAppbar';
import AnimalColourPicker from '../components/AnimalColourPicker.js';

var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalColourChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colour: this.props.route.params.colour,
    }
    this.changeAnimalColour = this.changeAnimalColour.bind(this);
  }

  handleChangeAnimalColourResponse(response) {
    console.log('Color del animal modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.goBack()
  }

  changeAnimalColour(animalColourChangeRequest) {
    this.setState({newValue: animalColourChangeRequest});
    let body = {
      newAnimalColour: animalColourChangeRequest,
    };
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [body, this.props.route.params.id],
        modifyAnimalColour,
      ).then(this.handleChangeAnimalColourResponse.bind(this));
    });
  }
  render() {
    return (
      <>
        <HeaderAppbar />
        <AnimalColourPicker colour = {this.state.colour}  onChange={newColour => this.setState({colour: newColour})}/>
          <Button
            style={styles.button}
            color="#ABE009"
            mode="contained"
            dark={true}
            onPress={() => this.changeAnimalColour(this.state.colour)
            }>
            Enviar
          </Button>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginVertical: 12,
  },
  button: {
    justifyContent: 'flex-end',
  },
});
