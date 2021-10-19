import React, { Fragment, useState } from 'react';
import {modifyAnimalStatus} from '../client/AnimalApi';
import { statusOption} from '../constants/DropdownOption';
import { StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { TextInput, Button, HelperText } from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalStatusChangeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        status:'',
    }
    this.changeAnimalStatus = this.changeAnimalStatus.bind(this);
  }

  handleChangeAnimalStatusResponse(response) {
    console.log('Estado animal modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.navigate('MyAnimalsScreen');
  }

  changeAnimalStatus(animalStatusChangeRequest) {
      console.log(animalStatusChangeRequest)
            console.log(animalStatusChangeRequest)


    let body = {
      newAnimalStatus: animalStatusChangeRequest,
    };
    console.log(body)
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi([body, this.props.route.params.id], modifyAnimalStatus).then(
          this.handleChangeAnimalStatusResponse.bind(this));
    });
  }

  render()
    {
      return (

        <View style={styles.container}>
            <Text style={styles.text}>Estado :  </Text>

            <Picker selectedValue = {this.props.route.params.status} onValueChange = {this.changeAnimalStatus}>
            {
            statusOption.map(status => {
                return ( <Picker.Item key={status.back_name+'_picker'} label={status.name}  value={status.back_name} />)
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

