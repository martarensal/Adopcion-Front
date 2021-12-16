import React, {Fragment, useState} from 'react';
import {modifyAnimalSize} from '../client/AnimalApi';
import {sizeOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
import HeaderAppbar from '../components/HeaderAppbar';

var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalSizeChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '',
    };
    this.changeAnimalSize = this.changeAnimalSize.bind(this);
  }

  handleChangeAnimalSizeResponse(response) {
    console.log('Estado animal modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.navigate('MyAnimalsScreen');
  }

  changeAnimalSize(animalSizeChangeRequest) {
    console.log(animalSizeChangeRequest);
    console.log(animalSizeChangeRequest);

    let body = {
      newAnimalSize: animalSizeChangeRequest,
    };
    console.log(body);
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [body, this.props.route.params.id],
        modifyAnimalSize,
      ).then(this.handleChangeAnimalSizeResponse.bind(this));
    });
  }

  render() {
    return (
      <>
        <HeaderAppbar />
        <View style={styles.container}>
          <Text style={styles.text}>Estado : </Text>

          <Picker
            selectedValue={this.props.route.params.statsize}
            onValueChange={this.changeAnimalSize}>
            {sizeOption.map(size => {
              return (
                <Picker.Item
                  key={size.back_name + '_picker'}
                  label={size.name}
                  value={size.back_name}
                />
              );
            })}
          </Picker>
        </View>
      </>
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
