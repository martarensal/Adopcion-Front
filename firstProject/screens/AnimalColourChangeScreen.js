import React, {Fragment, useState} from 'react';
import {modifyAnimalColour} from '../client/AnimalApi';
import {colourOption} from '../constants/DropdownOption';
import {StyleSheet, View, Text, Image,Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
import HeaderAppbar from '../components/HeaderAppbar';

var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalColourChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newValue: '',
    };
    this.changeAnimalColour = this.changeAnimalColour.bind(this);
  }

  handleChangeAnimalColourResponse(response) {
    console.log('Color del animal modificado');
    console.log(JSON.stringify(response));
    //this.props.navigation.navigate('MyAnimalsScreen');
  }

  changeAnimalColour(animalColourChangeRequest) {
    this.setState({newValue: animalColourChangeRequest});
     let body = {
      newAnimalColour: animalColourChangeRequest,
    };
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [body, this.props.route.params.id],
        modifyAnimalColour,
      ).then(this.handleChangeAnimalColourResponse.bind(this));
    });
  }

  render() {
    return (
      <>
        <HeaderAppbar />
        <View style={styles.container}>
          <Picker
            selectedValue={this.props.route.params.colour}
            onValueChange={this.changeAnimalColour}>
            {colourOption.map(colour => {
              return (
                <Picker.Item
                  key={colour.back_name + '_picker'}
                  label={colour.name}
                  value={colour.back_name}
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
                          'El color del animal ha sido modificado con éxito',
                          [
                            {
                              text: 'Ok',
                              onPress: () => this.props.navigation.navigate('MyAnimalsScreen'),
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
    flex:1,
    width: '100%',
    marginVertical: 12,
  },
  button: {
    justifyContent: 'flex-end',
  },
});
