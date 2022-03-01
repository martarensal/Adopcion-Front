import React, {Fragment, useState} from 'react';
import {requestStatusOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class RequestStatusPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.props.status}
          onValueChange={newStatus => this.props.onChange(newStatus)}>
          {requestStatusOption.map(status => {
            return (
              <Picker.Item
                key={status.back_name + '_picker'}
                label={status.name}
                value={status.back_name}
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
