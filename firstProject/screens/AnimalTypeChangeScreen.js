import React, {Fragment, useState} from 'react';
import {modifyAnimalType} from '../client/AnimalApi';
import {TypeOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {getTypes} from '../client/TypeApi';
import {TextInput, Button, HelperText} from 'react-native-paper';
import AnimalTypePicker from '../components/AnimalTypePicker';
import HeaderAppbar from '../components/HeaderAppbar';

var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalTypeChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      types: [],
      typeId: -1,
      newType: this.props.route.params.size,
    };
    this.changeAnimalType = this.changeAnimalType.bind(this);
    this.render = this.render.bind(this);
  }

  handleChangeAnimalTypeResponse(response) {
    console.log('Tipo de animal modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.goBack();
  }

  changeAnimalType(animalTypeChangeRequest) {
    this.setState({newValue: animalTypeChangeRequest});
    let body = {
      newAnimalType_id: animalTypeChangeRequest,
    };
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [body, this.props.route.params.id],
        modifyAnimalType,
      ).then(this.handleChangeAnimalTypeResponse.bind(this));
    });
  }
  async handleGetTypeResponse(response) {
    var types = [];
    const jsonResponse = await response.json();
    for (const i in jsonResponse.pages) {
      types.push({
        name: jsonResponse.pages[i].name,
        id: jsonResponse.pages[i].id,
      });
    }
    this.setState({types: types});
  }
  getTypesCall() {
    SecurityUtils.authorizeApi([], getTypes).then(
      this.handleGetTypeResponse.bind(this),
    );
  }

  componentDidMount() {
    this.getTypesCall();
  }

  render() {
    return (
      <>
        <HeaderAppbar />
        <View style={styles.container}>
          <AnimalTypePicker
            types={this.state.types}
            type={this.state.newType}
            onChange={newType => {
              this.setState({newType: newType});
            }}
          />
          <Button
            style={styles.button}
            color="#ABE009"
            mode="contained"
            dark={true}
            onPress={() => this.changeAnimalType(this.state.newType)}>
            Enviar
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
    marginTop: 15,
  },
  button: {
    marginTop: 24,
  },
});
