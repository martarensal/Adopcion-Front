import React, { Fragment, useState } from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { TextInput, Button, HelperText } from 'react-native-paper';
import FormManager from "./FormManager";
import {getAC, getProvincesFromAC, getCityFromProvince} from '../client/CityApi';
import { sexOption, colourOption, sizeOption } from '../constants/DropdownOption';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class FinalStep extends React.Component {

  formManager = FormManager.getFormManager()
  
  constructor(props) {
    super(props);
    this.state = {  
      ACs: [],
      provinces:[],
      cities:[],
      city: '',
      cityId: -1,
      province:'',
      AC:'',
      enabledProvince: false,
      enabledCity: false,    
    }
  }
  
  async handleGetACResponse(response) {
    var ACs = []
    const jsonResponse = await response.json();
    for (const i in jsonResponse.pages)
    {
      
      ACs.push(
        {
          name: jsonResponse.pages[i].autonomousCommunity,
          id: jsonResponse.pages[i].id
        })
    }

    this.setState({ACs: ACs});
  }

   async handleGetCityResponse(response) {
    var cities = []
    const jsonResponse = await response.json();
    for (const i in jsonResponse.pages)
    {
      cities.push(
        {
          name: jsonResponse.pages[i].name,
          id: jsonResponse.pages[i].id
        })
    }

    this.setState({cities: cities});
    //console.log(JSON.stringify(ACs))
  }
  
  async handlegetProvincefromAC(response) {
    var provinces = []
    const jsonResponse = await response.json();
    for (const i in jsonResponse.pages)
    {
      provinces.push(
        {
          name: jsonResponse.pages[i].province,
          id: jsonResponse.pages[i].id
        })
    }
    this.setState({provinces: provinces});
  }

  updateAC = (AC) => {
      this.setState({ AC: AC })
  }
  
  updateProvince = (province) => {
      this.setState({ province: province })
  }

  updateCity = (city, indexCity) => {
      this.setState({ city: city})
      FormManager.getFormManager().setField('cityId', this.state.cities[indexCity].id);
          console.log(FormManager.getFormManager().getField('cityId'))
  }

  handleEnabledProvince = () => {
    this.setState({enabledProvince: true})
    this.getProvincesFromAC();
  }
  
  handleEnabledCity = () => {
    this.setState({enabledCity: true})
    this.getCityFromProvince();
  }

  getACCall() {
    SecurityUtils.authorizeApi([], getAC).then(this.handleGetACResponse.bind(this))
  }

  getProvincesFromAC = () => {
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [this.state.AC],
        getProvincesFromAC,
      ).then(this.handlegetProvincefromAC.bind(this));
    });
  }

   getCityFromProvince = () => {
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [this.state.province],
        getCityFromProvince,
      ).then(this.handleGetCityResponse.bind(this));
    });
  }

  componentDidMount(){
    this.getACCall();
    FormManager.getFormManager().setField('cityId', this.state.cityId)
  }

  render() {
  return (
      <View>
      <Text style={styles.text}>Comunidad autonoma :  </Text>
        <Picker selectedValue = {this.state.AC} onValueChange = {this.updateAC}  enabled={true}  onBlur={this.handleEnabledProvince}  >
         {
           this.state.ACs.map(AC => {
             return ( 
             <Picker.Item key={AC.name+'_picker'} label={AC.name} value={AC.name}/>)
           })
         }
        
        </Picker>

         <Picker selectedValue = {this.state.province} onValueChange = {this.updateProvince}  enabled={this.state.enabledProvince} onBlur={this.handleEnabledCity}    >
         {
           this.state.provinces.map(province => {
             return ( 
             <Picker.Item key={province.name+'_picker'} label={province.name} value={province.name}/>)
           })
         }
        
        </Picker>

         <Picker selectedValue = {this.state.city} onValueChange = {this.updateCity}  enabled={this.state.enabledCity}   >
         {
           this.state.cities.map(city => {
             return ( 
             <Picker.Item key={city.name+'_picker'} label={city.name} value={city.name}/>)
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


