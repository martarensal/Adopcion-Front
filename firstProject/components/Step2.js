import React, { Fragment, useState } from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { TextInput, Button, HelperText } from 'react-native-paper';
import FormManager from "./FormManager";
import {getTypes} from '../client/TypeApi';
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
      size:'',
      types: [],
      type:'',
      typeId: -1,
    }
    this.render = this.render.bind(this)

  }

  async handleGetTypeResponse(response) {
    console.log(response)
    var types = []
    const jsonResponse = await response.json();
    console.log(jsonResponse)
    for (const i in jsonResponse.pages)
    {
      types.push( 
        {
          name: jsonResponse.pages[i].name,
          id: jsonResponse.pages[i].id
        })
    }
    this.setState({types: types});
    console.log(types)
  }
  
  getTypesCall() {
    SecurityUtils.authorizeApi([], getTypes).then(this.handleGetTypeResponse.bind(this))
  }

  updateType = (type, indexType) => {
      this.setState({ type: type })
      FormManager.getFormManager().setField('typeId', this.state.types[indexType].id);
  }
   
  updateSize = (size) => {
      this.setState({ size: size })
      FormManager.getFormManager().setField('size', size);
  }

  updateColour = (colour) => {
      this.setState({colour: colour})
      FormManager.getFormManager().setField('colour', colour)
  }

  updateSex = (sex) => {
      this.setState({sex: sex})
      FormManager.getFormManager().setField('sex', sex)
  }

  componentDidMount() {
    this.getTypesCall();
    this.setState({sex: FormManager.getFormManager().getField('sex')})
    this.setState({colour: FormManager.getFormManager().getField('colour')})
    this.setState({size: FormManager.getFormManager().getField('size')})
    FormManager.getFormManager().setField('typeId', this.state.typeId)

  }

  render(){
      return (
      <View style={styles.container}>
        <Text style={styles.text}>Sexo   </Text>

         <Picker selectedValue = {this.state.sex} onValueChange = {this.updateSex}>
         
         {
           sexOption.map(sex => {
             return ( <Picker.Item key={sex.back_name+'_picker'} label={sex.name}  value={sex.back_name} />)
           })
         }
        </Picker>
        <Text style={styles.text}>Color   </Text>

        <Picker selectedValue = {this.state.colour} onValueChange = {this.updateColour}>
         {
           colourOption.map(colour => {
             return ( <Picker.Item key={colour.back_name+'_picker'} label={colour.name} value={colour.back_name} />)
           })
         }
        </Picker>
      

        <Text style={styles.text}>Tamaño   </Text>
         <Picker selectedValue = {this.state.size} onValueChange = {this.updateSize}>
         {
           sizeOption.map(size => {
             return ( <Picker.Item key={size.back_name+'_picker'} label={size.name} value={size.back_name}/>)
           })

         }
        </Picker>
        
        <Text style={styles.text}>Tipo de animal  </Text>
        <Picker selectedValue = {this.state.type} onValueChange = {this.updateType}>
         {
           this.state.types.map(type => {
             return ( <Picker.Item key={type.name+'_picker'} label={type.name} value={type.name}/>)
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
  text: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
    alignContent: 'center',
    marginBottom: 5,
    marginTop: 20,
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

