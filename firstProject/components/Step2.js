import React, { Fragment, useState } from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { TextInput, Button, HelperText } from 'react-native-paper';
import FormManager from "./FormManager";
import { sexOption, colourOption, sizeOption } from '../constants/DropdownOption';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class Step1 extends React.Component {

  formManager = FormManager.getFormManager()
  
  constructor(props) {
    super(props);
   
    this.state = {
      sex:'',
      colour:'',
      size:''
    }
  }
   updateSize = (size) => {
      this.setState({ size: size })
      this.formManager.setField('size', size)
   }

   updateColour = (colour) => {
      this.setState({colour: colour})
      this.formManager.setField('colour', colour)

   }

   updateSex = (sex) => {
      this.setState({sex: sex})
      this.formManager.setField('sex', sex)

   }

  componentDidMount() {
    this.setState({sex: FormManager.getFormManager().getField('sex')})
    this.setState({colour: FormManager.getFormManager().getField('colour')})
    this.setState({size: FormManager.getFormManager().getField('size')})

  }

  render(){
      return (
      <View style={styles.container}>
      
         <Picker selectedValue = {this.state.sex} onValueChange = {this.updateSex}>
         
         {
           sexOption.map(sex => {
             return ( <Picker.Item key={sex.back_name+'_picker'} label={sex.name}  value={sex.back_name} />)
           })
         }
        </Picker>
        <Picker selectedValue = {this.state.colour} onValueChange = {this.updateColour}>
         {
           colourOption.map(colour => {
             return ( <Picker.Item key={colour.back_name+'_picker'} label={colour.name} value={colour.back_name} />)
           })
         }
        </Picker>
         <Picker selectedValue = {this.state.size} onValueChange = {this.updateSize}>
         {
           sizeOption.map(size => {
             return ( <Picker.Item key={size.back_name+'_picker'} label={size.name} value={size.back_name}/>)
           })

         }
        </Picker>
          
        </View>)
    }

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
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

