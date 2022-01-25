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
import AnimalCityPicker from './AnimalCityPicker';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class FinalStep extends React.Component {
  formManager = FormManager.getFormManager();

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
         <AnimalCityPicker  autonomousCommunity={this.props.autonomousCommunity}
            autonomousCommunities={this.props.autonomousCommunities}
            province={this.props.province}
            provinces={this.props.provinces}
            city={this.props.city}
            cities={this.props.cities}
            onAutonomousCommunityChange={autonomousCommunity => {
              this.props.onChange('autonomousCommunity', autonomousCommunity);
              this.props.getProvincesFromAC();
            }}
            onProvinceChange={province => {
              this.props.onChange('province', province);
              this.props.getCityFromProvince();
            }}
            onCityChange={city => {
              this.props.onChange('city',  city);
            }} 
            />
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
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
    alignContent: 'center',
    marginVertical: 15,
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
