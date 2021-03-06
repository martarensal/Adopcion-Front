import React, {Fragment, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalTypePicker extends React.Component {
  constructor(props) {
    super(props);
  }
   onChangeField(value) {
    this.props.onChange(value);
  }

  render() {
    return (
      <View key={'Tipo'}>
            <Picker
              selectedValue={this.props.type}
              onValueChange={text => this.onChangeField(text)}>
              <Picker.Item
            key="undefined_picker"
            label="-- NO SELECCIONADO --"
            value={undefined}
          />
          {this.props.types.map(type => {
            return (
              <Picker.Item
                key={type.name + '_picker'}
                label={type.name}
                value={type.id}
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
