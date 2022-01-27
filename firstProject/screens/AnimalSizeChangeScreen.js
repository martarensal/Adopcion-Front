import React, {Fragment, useState} from 'react';
import {modifyAnimalSize} from '../client/AnimalApi';
import {sizeOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
import HeaderAppbar from '../components/HeaderAppbar';

var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalSizeChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newValue: '',
    };
    this.changeAnimalSize = this.changeAnimalSize.bind(this);
  }

  handleChangeAnimalSizeResponse(response) {
    console.log('Estado animal modificado');
    console.log(JSON.stringify(response));
  }

  changeAnimalSize(animalSizeChangeRequest) {
    console.log(animalSizeChangeRequest);
    console.log(animalSizeChangeRequest);
    this.setState({newValue: animalSizeChangeRequest});

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
          <Picker
            selectedValue={this.props.route.params.size}
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
          <Button
            style={styles.button}
            color="#ABE009"
            mode="contained"
            disabled={!this.state.newValue}
            dark={true}
            onPress={() =>
              this.props.navigation.goBack()
            }>
            {' '}
            Enviar{' '}
          </Button>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    marginTop: 15,
  },
  button: {
    marginTop: 24,
  },
});
