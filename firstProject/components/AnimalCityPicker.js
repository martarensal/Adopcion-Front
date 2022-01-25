import React, {Fragment, useState} from 'react';
import {StyleSheet, ScrollView, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TextInput, Button, HelperText} from 'react-native-paper';
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
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.text}>Comunidad autonoma </Text>

        <Picker
          selectedValue={this.props.autonomousCommunity}
          onValueChange={this.props.onAutonomousCommunityChange}>
          <Picker.Item
            key="undefined_picker"
            label="-- NO SELECCIONADO --"
            value={undefined}
          />
          {this.props.autonomousCommunities.map(AC => {
            return (
              <Picker.Item
                key={AC.autonomousCommunity + '_picker'}
                label={AC.autonomousCommunity}
                value={AC.autonomousCommunity}
              />
            );
          })}
        </Picker>

        <Text style={styles.text}>Provincia  </Text>
        <Picker
          selectedValue={this.props.province}
          onValueChange={this.props.onProvinceChange}>
          <Picker.Item
            key="undefined_picker"
            label="-- NO SELECCIONADO --"
            value={undefined}
          />
          {this.props.provinces.map(province => {
            return (
              <Picker.Item
                key={province.province + '_picker'}
                label={province.province}
                value={province.province}
              />
            );
          })}
        </Picker>
        <Text style={styles.text}>Ciudad </Text>

         <Picker
          selectedValue={this.props.city}
          onValueChange={this.props.onCityChange}
          >
          <Picker.Item
            key="undefined_picker"
            label="-- NO SELECCIONADO --"
            value={undefined}
          />
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
      </ScrollView>
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
