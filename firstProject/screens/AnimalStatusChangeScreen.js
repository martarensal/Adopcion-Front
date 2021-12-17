import React, {Fragment, useState} from 'react';
import {modifyAnimalStatus} from '../client/AnimalApi';
import {statusOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
import HeaderAppbar from '../components/HeaderAppbar';

var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalStatusChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newValue: '',
    };
    this.changeAnimalStatus = this.changeAnimalStatus.bind(this);
  }

  handleChangeAnimalStatusResponse(response) {
    console.log('Estado animal modificado');
    console.log(JSON.stringify(response));
  }

  changeAnimalStatus(animalStatusChangeRequest) {
    console.log(animalStatusChangeRequest);
    console.log(animalStatusChangeRequest);
    this.setState({newValue: animalStatusChangeRequest});

    let body = {
      newAnimalStatus: animalStatusChangeRequest,
    };
    console.log(body);
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [body, this.props.route.params.id],
        modifyAnimalStatus,
      ).then(this.handleChangeAnimalStatusResponse.bind(this));
    });
  }

  render() {
    return (
      <>
        <HeaderAppbar />
        <View style={styles.container}>
          <Picker
            selectedValue={this.props.route.params.status}
            onValueChange={this.changeAnimalStatus}>
            {statusOption.map(status => {
              return (
                <Picker.Item
                  key={status.back_name + '_picker'}
                  label={status.name}
                  value={status.back_name}
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
                'El estado del animal ha sido modificado con éxito',
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
