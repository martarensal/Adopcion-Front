import React, {Fragment, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';

var validate = require('validate.js');

const STEP1_FORM_FIELDS = [
  {label: 'Nombre', fieldName: 'name'},
  {label: 'Edad', fieldName: 'age'},
];

export default class NameAndAgeStep extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(field, value) {
    this.props.onChange(field, value);
  }

  render() {
    return (
      <View style={styles.container}>
        {STEP1_FORM_FIELDS.map(formField => (
          <View key={formField.label}>
            <TextInput
              mode="outlined"
              autoCorrect={false}
              label={formField.label}
              value={this.props[formField.fieldName]}
              onChangeText={(text) => this.onChangeText(formField.fieldName, text)}
            />
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
});
