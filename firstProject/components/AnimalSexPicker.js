import React, {Fragment, useState} from 'react';
import {sexOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalSexPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Picker selectedValue={this.props.sex} onValueChange={newAnimalSex => this.props.onChange(newAnimalSex)}>
          {sexOption.map(sex => {
            return (
              <Picker.Item
                key={sex.back_name + '_picker'}
                label={sex.name}
                value={sex.back_name}
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
