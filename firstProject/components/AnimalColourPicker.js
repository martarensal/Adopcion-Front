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
    this.state = {
      colour: '',
    };
    this.render = this.render.bind(this);
  }
  updateColour = colour => {
    this.setState({colour: colour});
    console.log(colourOption);
    //this.props.onChange(colour);
    this.props.onChange(colour)
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Color : </Text>
        <Picker
          selectedValue={this.state.colour}
          onValueChange={this.updateColour}>
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
  },
  text: {
    fontFamily: 'OpenSans-Bold',
    color: '#F05524',
    fontSize: 15,
    marginTop: 5,
    paddingLeft: 10,
  },
  button: {
    marginTop: 24,
  },
  searchableDropdown: {
    padding: 10,
    marginTop: 2,
    borderWidth: 1,
    borderRadius: 5,
  },
  textInputSearchable: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
  },
  cameraButton: {
    marginTop: 12,
  },
});
