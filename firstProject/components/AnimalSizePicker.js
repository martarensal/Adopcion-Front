import React, { Fragment, useState } from 'react';
import { sizeOption} from '../constants/DropdownOption';
import { StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { TextInput, Button, HelperText } from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalSizePicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        size:'',
    }
    this.render = this.render.bind(this);
  }
  updateSize = (size) => {
      this.setState({size: size})
      console.log(sizeOption)
      //FormManager.getFormManager().setField('sex', sex)
  }
  componentDidMount(){
          //console.log(sexOption)

  }
  
  render()
    {
      return (

        <View style={styles.container}>
            <Text style={styles.text}>Tamaño :  </Text>
            <Picker selectedValue = {this.state.size} onValueChange = {this.updateSize}>
            {
            sizeOption.map(size => {
                return ( <Picker.Item key={size.back_name+'_picker'} label={size.name}  value={size.back_name} />)
            })
            }
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
    paddingLeft:10,
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
  }
});

