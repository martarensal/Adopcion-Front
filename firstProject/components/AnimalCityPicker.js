import React, {Fragment, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
import FormManager from './FormManager';
import {
  getAC,
  getProvincesFromAC,
  getCityFromProvince,
} from '../client/CityApi';
import {sexOption, colourOption, sizeOption} from '../constants/DropdownOption';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalCityPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabledProvince: false,
      enabledCity: false,
    };
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>Comunidad autonoma : </Text>
        <Picker
          selectedValue={this.props.autonomousCommunity}
          onValueChange={(newCommunity) => {
            this.setState({enabledProvince: true})
            this.props.onAutonomousCommunityChange(newCommunity)
          }
          }
          >
          {this.props.autonomousCommunities.map(AC => {
            return (
              <Picker.Item
                key={AC.name + '_picker'}
                label={AC.name}
                value={AC.name}
              />
            );
          })}
        </Picker>

        <Picker
          selectedValue={this.props.province}
          onValueChange={(newProvince) => {
            this.setState({enabledCity: true})
            this.props.onProvinceChange(newProvince)
          }} >
          enabled={this.state.enabledProvince}
          {this.props.provinces.map(province => {
            return (
              <Picker.Item
                key={province.name + '_picker'}
                label={province.name}
                value={province.name}
              />
            );
          })}
        </Picker>

        <Picker
          selectedValue={this.props.city}
          onValueChange={(newCity) => {
            this.setState({enabledCity: true})
            this.props.onCityChange(newCity)
          }} >
          enabled={this.state.enabledCity}
          {this.props.cities.map(city => {
            return (
              <Picker.Item
                key={city.name + '_picker'}
                label={city.name}
                value={city.name}
              />
            );
          })}
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
