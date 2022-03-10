import React, {Fragment, useState} from 'react';
import {sizeOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');
export default class AnimalSizePicker extends React.Component {
  constructor(props) {
    super(props);
  }
  onChangeField(value) {
    this.props.onChange(value);
  }

  render() {
    return (
      <View key={'Tamaño'}>
            <Picker
              selectedValue={this.props.animalSize}
              onValueChange={text => this.onChangeField(text)}>
              {sizeOption.map(option => {
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
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  }
});
