import React, { Fragment, useState } from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import {getTypes} from '../client/TypeApi';
import {Picker} from '@react-native-picker/picker';
import { TextInput, Button, HelperText } from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalTypePicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        types: [],
        type:'',
        typeId: -1,
    }
    this.render = this.render.bind(this);
  }
  updateType = (type) => {
      this.setState({type: type})
      //console.log(type)
      //FormManager.getFormManager().setField('sex', sex)
  }
   async handleGetTypeResponse(response) {
    var types = []
    const jsonResponse = await response.json();
    for (const i in jsonResponse.pages)
    {
      types.push( 
        {
          name: jsonResponse.pages[i].name,
          id: jsonResponse.pages[i].id
        })
    }
    this.setState({types: types});
  }

  getTypesCall() {
    SecurityUtils.authorizeApi([], getTypes).then(this.handleGetTypeResponse.bind(this))
  }
  componentDidMount(){
          //console.log(sexOption)
    this.getTypesCall();
  }
  
  render()
    {
      return (
        <View style={styles.container}>
            <Text style={styles.text}>Tipo de animal :  </Text>
                <Picker selectedValue = {this.state.type} onValueChange = {this.updateType}>
                {
                this.state.types.map(type => {
                    return ( <Picker.Item key={type.name+'_picker'} label={type.name} value={type.name}/>)
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

