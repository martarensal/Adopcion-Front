import React, {Fragment, useState} from 'react';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
import {
  sexOption,
  sizeOption,
  statusOption,
  colorOption,
} from '../constants/DropdownOption';
import {getTypes} from '../client/TypeApi';
import {addAnimal} from '../client/AnimalApi';
import {getUser} from '../client/UsersApi';
import Stepper from 'react-native-stepper-ui';
import NameAndAgeStep from '../components/NameAndAgeStep.js';
import SexColourSizeAndTypeStep from '../components/SexColourSizeAndTypeStep.js';
import ImageStep from '../components/ImageStep.js';
import AnimalCityPicker from '../components/AnimalCityPicker'

var validate = require('validate.js');

const launchCameraOptions = {
  includeBase64: true,
};

export default class AnimalCreationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }

  render() {
        console.log(JSON.stringify(this.props, null, 3))


    let content = [
      <NameAndAgeStep
        age={this.props.age}
        name={this.props.name}
        onChange={this.props.onChangeAnimalField}
      />,
       <SexColourSizeAndTypeStep
        size={this.props.size}
        colour={this.props.colour}
        sex={this.props.sex}
        type={this.props.type}
        types={this.props.types}
        onChange={this.props.onChangeAnimalField}
      />,
      <ImageStep onChange={this.props.onChangeAnimalField} />,
      <AnimalCityPicker
           autonomousCommunity={this.props.autonomousCommunity}
            autonomousCommunities={this.props.autonomousCommunities}
            province={this.props.province}
            provinces={this.props.provinces}
            city={this.props.city}
            cities={this.props.cities}
            onAutonomousCommunityChange={autonomousCommunity => {
              this.props.onChangeAnimalField('autonomousCommunity', autonomousCommunity);
              this.props.getProvincesFromAC();
            }}
            onProvinceChange={province => {
              this.props.onChangeAnimalField('province', province);
              this.props.getCityFromProvince();
            }}
            onCityChange={city => {
              this.props.onChangeAnimalField('city',  city);
            }} 
      />,
    ];
  
    return (
      <View style={styles.container}>
        <Stepper
          active={this.state.active}
          content={content}
          onNext={() => this.nextHandler()}
          onBack={() => this.setState({active: this.state.active - 1})}
          onFinish={() => {
            Alert.alert(
              'Confirmaci??n',
              'El animal ha sido creado con exito',
              [
                {
                  text: 'Ok',
                  onPress: () => this.props.onCreate(),
                },
              ],
              {cancelable: false},
            );
            this.nextHandler();
          }}
        />
      </View>
    );
  }

  
  isValidNumber(number) {
    let intNumber = parseInt(number);
    return !isNaN(intNumber) && intNumber >= 0 && intNumber <= 500;
  }

  nextHandler() {
    switch (this.state.active) {
      case 0:
        let name = this.props.name;
        if (name == '')
          Alert.alert('Error', 'El campo nombre no puede estar vac??o');
        else {
          let age = this.props.age;
          if (!this.isValidNumber(age)) {
            Alert.alert('Error', 'Debe rellenar correctamente el campo edad');
          } else {
            this.setState({active: this.state.active + 1});
          }
        }
        break;
      case 1:
        this.setState({active: this.state.active + 1});

        break;
      case 2:
        this.setState({active: this.state.active + 1});

        break;
      case 3:
        let city = this.props.city;
        if (city == -1) {
          Alert.alert('Error', 'Debe rellenar todos los campos');
        } else {
          let name = this.props.name;
          let age = this.props.age;
          let sex = this.props.sex;
          let image = this.props.image;
          let size = this.props.size;
          let colour = this.props.colour;
          let type = this.props.type;
          this.props.onFinish(name, sex, age, colour, size, city, type, image);
        }
        break;
      default:
        break;
    }
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
