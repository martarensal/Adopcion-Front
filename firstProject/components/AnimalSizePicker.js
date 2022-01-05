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

  render() {
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.props.animalSize}
          onValueChange={newAnimalSize => this.props.onChange(newAnimalSize)}>
          {sizeOption.map(size => {
            return (
              <Picker.Item
                key={size.back_name + '_picker'}
                label={size.name}
                value={size.back_name}
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
