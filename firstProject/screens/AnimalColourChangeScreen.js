import React, {Fragment, useState} from 'react';
import {modifyAnimalColour} from '../client/AnimalApi';
import {colourOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
import HeaderAppbar from '../components/HeaderAppbar';

var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalColourChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colour: '',
    };
    this.changeAnimalColour = this.changeAnimalColour.bind(this);
  }

  handleChangeAnimalColourResponse(response) {
    console.log('Color del animal modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.navigate('MyAnimalsScreen');
  }

  changeAnimalColour(animalColourChangeRequest) {
    console.log(animalColourChangeRequest);
    console.log(animalColourChangeRequest);

    let body = {
      newAnimalColour: animalColourChangeRequest,
    };
    console.log(body);
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
        <View style={styles.container}>
          <Picker
            selectedValue={this.props.route.params.colour}
            onValueChange={this.changeAnimalColour}>
            {colourOption.map(colour => {
              return (
                <Picker.Item
                  key={colour.back_name + '_picker'}
                  label={colour.name}
                  value={colour.back_name}
                />
              );
            })}
          </Picker>
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
});
