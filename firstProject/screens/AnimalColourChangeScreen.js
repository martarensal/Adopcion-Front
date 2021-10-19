import React, { Fragment, useState } from 'react';
import {modifyAnimalColour} from '../client/AnimalApi';
import { colourOption} from '../constants/DropdownOption';
import { StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { TextInput, Button, HelperText } from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalColourChangeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        colour:'',
    }
    this.changeAnimalColour = this.changeAnimalColour.bind(this);
  }

  handleChangeAnimalColourResponse(response) {
    console.log('Color del animal modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.navigate('MyAnimalsScreen');
  }

  changeAnimalColour(animalColourChangeRequest) {
      console.log(animalColourChangeRequest)
            console.log(animalColourChangeRequest)


    let body = {
      newAnimalColour: animalColourChangeRequest,
    };
    console.log(body)
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi([body, this.props.route.params.id], modifyAnimalColour).then(
          this.handleChangeAnimalColourResponse.bind(this));
    });
  }

  render()
    {
      return (

        <View style={styles.container}>
            <Text style={styles.text}>Color :  </Text>

            <Picker selectedValue = {this.props.route.params.colour} onValueChange = {this.changeAnimalColour}>
            {
            colourOption.map(colour => {
                return ( <Picker.Item key={colour.back_name+'_picker'} label={colour.name}  value={colour.back_name} />)
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

