import React, {Fragment, useState} from 'react';
import {colourOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalColourPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.props.colour}
          onValueChange={newAnimalColour => this.props.onChange(newAnimalColour)}>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  }
});
