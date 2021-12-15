import React, { Fragment, useState } from 'react';
import {modifyAnimalSex} from '../client/AnimalApi';
import { sexOption} from '../constants/DropdownOption';
import { StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { TextInput, Button, HelperText } from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalSexChangeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        sex:'',
    }
    this.changeAnimalSex = this.changeAnimalSex.bind(this);
  }

  handleChangeAnimalSexResponse(response) {
    console.log('Sexo animal modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.navigate('MyAnimalsScreen');
  }

  changeAnimalSex(animalSexChangeRequest) {
    let body = {
      newAnimalSex: animalSexChangeRequest,
    };
    console.log(body)
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi([body, this.props.route.params.id], modifyAnimalSex).then(
          this.handleChangeAnimalSexResponse.bind(this));
    });
  }

  render()
    {
      return (

        <View style={styles.container}>
            <Text style={styles.text}>Sexo :  </Text>

            <Picker selectedValue = {this.props.route.params.sex} onValueChange = {this.changeAnimalSex}>
            {
            sexOption.map(sex => {
                return ( <Picker.Item key={sex.back_name+'_picker'} label={sex.name}  value={sex.back_name} />)
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

