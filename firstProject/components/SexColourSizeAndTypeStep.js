import React, {Fragment, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {getTypes} from '../client/TypeApi';
import {sexOption, colourOption, sizeOption} from '../constants/DropdownOption';
import AnimalTypePicker from './AnimalTypePicker.js';

var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

const STEP2_FORM_FIELDS = [
  {
    name: 'Sexo',
    field: 'sex',
    options: sexOption,
  },
  {
    name: 'Colour',
    field: 'colour',
    options: colourOption,
  },
  {
    name: 'Tamaño',
    field: 'size',
    options: sizeOption,
  },
];

export default class SexColourSizeAndTypeStep extends React.Component {
  constructor(props) {
    super(props);
  }
  onChangeField(field, value) {
    this.props.onChange(field, value);
  }
  render() {
    return (
      <View style={styles.container}>
        {STEP2_FORM_FIELDS.map(formField => (
          <View key={formField.name}>
            <Text style={styles.text}>{formField.name}</Text>
            <Picker
              selectedValue={this.props[formField.field]}
              onValueChange={text => this.onChangeField(formField.field, text)}>
              {formField.options.map(option => {
                return (
                  <Picker.Item
                    key={option.back_name + '_picker'}
                    label={option.name}
                    value={option.back_name}
                  />
                );
              })}
            </Picker>
          </View>
        ))}

        <Text style={styles.text}>Tipo de animal </Text>
        <AnimalTypePicker
          type={this.props.type}
          types={this.props.types}
          onChange={newType => this.onChangeField('type', newType)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  text: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
    alignContent: 'center',
    marginBottom: 5,
    marginTop: 20,
  },
  button: {
    marginTop: 24,
  },
});
