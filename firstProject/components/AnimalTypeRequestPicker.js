import React, {Fragment, useState} from 'react';
import {typeOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalTypeRequestPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View >
        <Text >Tipo de solicitud : </Text>
        <Picker selectedValue={this.props.type} onValueChange={newAnimalTypeRequest => this.props.onChange(newAnimalTypeRequest)}>
          {typeOption.map(type => {
            return (
              <Picker.Item
                key={type.back_name + '_picker'}
                label={type.name}
                value={type.back_name}
              />
            );
          })}
        </Picker>
      </View>
    );
  }
}