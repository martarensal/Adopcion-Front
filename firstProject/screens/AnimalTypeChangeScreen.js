import React, {Fragment, useState} from 'react';
import {modifyAnimalType} from '../client/AnimalApi';
import {TypeOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {getTypes} from '../client/TypeApi';
import {TextInput, Button, HelperText} from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalTypeChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      types: [],
      typeId: -1,
      newValue: '',
    };
    this.changeAnimalType = this.changeAnimalType.bind(this);
    this.render = this.render.bind(this);
  }

  handleChangeAnimalTypeResponse(response) {
    console.log('Tipo de animal modificado');
    console.log(JSON.stringify(response));
  }

  changeAnimalType(animalTypeChangeRequest) {
    this.setState({newValue: animalTypeChangeRequest});
    let body = {
      newAnimalType_id: animalTypeChangeRequest,
    };
    console.log(body);
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

  updateType = (type, indexType) => {
    this.setState({type: type});
    this.changeAnimalType(this.state.types[indexType].id);
  };

  componentDidMount() {
    this.getTypesCall();
  }

  render() {
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.props.route.params.type}
          onValueChange={this.updateType}>
          {this.state.types.map(type => {
            return (
              <Picker.Item
                key={type.name + '_picker'}
                label={type.name}
                value={type.name}
              />
            );
          })}
        </Picker>
        <Button
          style={styles.button}
          color="#ABE009"
          mode="contained"
          disabled={!this.state.newValue}
          dark={true}
          onPress={() =>
            Alert.alert(
              'Confirmación',
              'El tipo de animal ha sido modificado con éxito',
              [
                {
                  text: 'Ok',
                  onPress: () =>
                    this.props.navigation.navigate('MyAnimalsScreen'),
                },
              ],
              {cancelable: false},
            )
          }>
          {' '}
          Enviar{' '}
        </Button>
      </View>
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
