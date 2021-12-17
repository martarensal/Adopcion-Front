import React, {Fragment, useState} from 'react';
import {modifyAnimalSex} from '../client/AnimalApi';
import {sexOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
import HeaderAppbar from '../components/HeaderAppbar';

var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalSexChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newValue: '',
    };
    this.changeAnimalSex = this.changeAnimalSex.bind(this);
  }

  handleChangeAnimalSexResponse(response) {
    console.log('Sexo animal modificado');
    console.log(JSON.stringify(response));
  }

  changeAnimalSex(animalSexChangeRequest) {
    this.setState({newValue: animalSexChangeRequest});
    let body = {
      newAnimalSex: animalSexChangeRequest,
    };
    console.log(body);
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [body, this.props.route.params.id],
        modifyAnimalSex,
      ).then(this.handleChangeAnimalSexResponse.bind(this));
    });
  }

  render() {
    return (
      <>
        <HeaderAppbar />
        <View style={styles.container}>
          <Picker
            selectedValue={this.props.route.params.sex}
            onValueChange={this.changeAnimalSex}>
            {sexOption.map(sex => {
              return (
                <Picker.Item
                  key={sex.back_name + '_picker'}
                  label={sex.name}
                  value={sex.back_name}
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
              Alert.alert(
                'Confirmación',
                'El sexo del animal ha sido modificado con éxito',
                [
                  {
                    text: 'Ok',
                    onPress: () =>
                      this.props.navigation.navigate('MyAnimalsScreen'),
                  },
                ],
                {cancelable: false},
              )
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
  },
  button: {
    marginTop: 24,
  },
});
