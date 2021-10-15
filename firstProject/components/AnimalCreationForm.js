import React, { Fragment, useState } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
import { sexOption, sizeOption, statusOption, colorOption } from '../constants/DropdownOption';
import {getTypes} from '../client/TypeApi';
import {addAnimal} from '../client/AnimalApi';
import {getUser} from '../client/UsersApi';
import Stepper from 'react-native-stepper-ui';
import Step1 from '../components/Step1.js';
import Step2 from '../components/Step2.js';
import Step3 from '../components/Step3.js';
import FinalStep from '../components/FinalStep.js';
import FormManager from "./FormManager";

var validate = require('validate.js');

   const launchCameraOptions = {
        includeBase64: true
    }

export default class AnimalCreationForm extends React.Component {
  formManager = FormManager.getFormManager()

  constructor(props){
    super(props);
    this.addAnimalCall = this.addAnimalCall.bind(this)
    this.state = 
    {
      active: 0, 
      loading: false,
      user:{},
    }
  }

  async handleGetTypeResponse(response) {
    var types = []
    const jsonResponse = await response.json();
    for (const i in jsonResponse.pages)
    {
      types.push( 
        {
          name: jsonResponse.pages[i].name,
        })
    }
    this.setState({types: types});
  }

  handleGetUserResponse(response) {
    response.json().then(data => {
      //console.log(data)
      this.setState({user: data, loading: false})
    
    } );
  }

  fetchUserData() {
    this.setState({loading: true});
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi([info.sub], getUser).then(
        this.handleGetUserResponse.bind(this),
      );
    });
 
  }

  getTypesCall() {
    SecurityUtils.authorizeApi([], getTypes).then(this.handleGetTypeResponse.bind(this))
  }

  handleCreateNewAnimalResponse(response) {
    if (response.ok) {
      console.log(JSON.stringify(response));
      console.log('Animal creado');

    } else {
      console.log(JSON.stringify(response));
      this.setState({isErrorVisible: true});
    }
  }

  addAnimalCall(name, sex, age, colour, size, city, type, image) {

    let body = {
          age: age,
          city_id: city,
          colour: colour,
          image: image,
          name: name,
          sex: sex,
          size: size,
          status:'homeless',
          type_id: type,
    }

    SecurityUtils.authorizeApi([body, this.props.username], addAnimal).then(this.handleCreateNewAnimalResponse.bind(this));

  }

  componentDidMount() {
    this.getTypesCall();
    this.fetchUserData.bind(this)
    //console.log(this.props.username)
  }

  isFormIncompleteOrIncorrect() {
    return (
      validate(this.state) !== undefined ||
      !this.state.name ||
      !this.state.age ||
      !this.state.sex ||
      !this.state.city ||
      !this.state.size ||
      !this.state.colour ||
      !this.state.status
    );
  }

  renderHelperText(fieldName) {
    if (this.state[fieldName].length > 0) {
      let validationResult = validate.single(
        this.state[fieldName],
      );
      if (validationResult !== undefined) {
        return (
          <HelperText type="error" padding="none">
            {validationResult[0]}
          </HelperText>
        );
      }
    }
  }
  
  render(){
    return( 
      <View style={styles.container} >
        <Stepper
          active={this.state.active}
          content={this.content}
          onNext={() => this.nextHandler()}
          onBack={() => this.setState({ active: this.state.active - 1 })}
          onFinish={() => {
            Alert.alert(
              "Animal creado",
              "Tu animal ha sido añadido con éxito",
            );
            this.nextHandler()
            this.props.navigation.navigate('MainScreen')
            }
          }
        />

      </View>
    )
  }
  
  content = [
    <Step1/>,
    <Step2/>,
    <Step3/>,
    <FinalStep/>
  ];

  isValidNumber(number){
    intNumber = parseInt(number)
    return !isNaN(intNumber) && intNumber >= 0 && intNumber <= 344;
  }

  nextHandler(){
    switch (this.state.active) {
      case 0:
        let name = FormManager.getFormManager().getField('name'); 
        if(name == "" )
            Alert.alert("Error", "El campo nombre no puede estar vacío")
        else
        {
          age = FormManager.getFormManager().getField('age');
          if (!this.isValidNumber(age))
          {
            Alert.alert("Error", "Debe rellenar correctamente el campo edad")
          }else
          {
            this.setState({ active: this.state.active + 1})
          }
        }
      break;
      case 1:
      
        this.setState({ active: this.state.active + 1})

      break;
      case 2: 
      
        this.setState({ active: this.state.active + 1})
      
      break;
      case 3:
        let cityId = FormManager.getFormManager().getField('cityId'); 
        console.log(cityId)
        if(cityId == -1)
        {
          Alert.alert("Error", "Debe rellenar todos los campos")

        }else
          {
            let formManager = FormManager.getFormManager()
             	let name = formManager.getField('name')
              let age = formManager.getField('age')
              let sex = formManager.getField('sex')
              let image = formManager.getField('image')
              let size = formManager.getField('size')
              let colour = formManager.getField('colour')
              let status = formManager.getField('status')
              let cityId = formManager.getField('cityId')
              let typeId = formManager.getField('typeId')
              let value = formManager.getField('value')

              this.addAnimalCall(name, sex, age, colour, size, cityId, typeId, image)

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
  }
});