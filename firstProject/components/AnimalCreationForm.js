import React, { Fragment, useState } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
import SearchableDropdown from 'react-native-searchable-dropdown';
import { sexOption, sizeOption, statusOption, colorOption } from '../constants/DropdownOption';
import {getTypes} from '../client/TypeApi';
import Stepper from 'react-native-stepper-ui';
import Step1 from '../components/Step1.js';
import Step2 from '../components/Step2.js';
import Step3 from '../components/Step3.js';


import FormManager from "./FormManager";

var validate = require('validate.js');

   const launchCameraOptions = {
        includeBase64: true
    }

export default class AnimalCreationForm extends React.Component {
  formManager = FormManager.getFormManager()

  constructor(props) {
    super(props);

    this.state = 
    {
      active: 0
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

  getTypesCall() {
    SecurityUtils.authorizeApi([], getTypes).then(this.handleGetTypeResponse.bind(this))
  }

  componentDidMount() {
    this.getTypesCall();
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
  /*render() {
    return (
      <View style={styles.container}>
        {[
          { label: 'Nombre', fieldName: 'name' },
          { label: 'Edad', fieldName: 'age' },
          { label: 'Ciudad', fieldName: 'city' }

        ].map(x => (
          <View key={x.label}>
            <TextInput
              mode="outlined"
              autoCorrect={false}
              label={x.label}
              error={
                validate.single(
                  this.state[x.fieldName],
                )
              }
              value={this.state[x.fieldName]}
              autoCompleteType={x.autoCompleteType}
              onChangeText={value => this.setState({ [x.fieldName]: value })}
            />
            {this.renderHelperText(x.fieldName)}
          </View>
        ))}

        <Button style = {styles.cameraButton}
                    color="#ABE009"
                    mode="contained"
                    dark={true}
                    onPress={() => launchCamera(null,(response) => this.setState({image: response.assets[0].base64}))}>
                    Camara
                </Button>
                  <Button style = {styles.cameraButton}
                    color="#ABE009"
                    mode="contained"
                    dark={true}
                    onPress={() => launchImageLibrary(launchCameraOptions,(response) => this.setState({image: response.assets[0].base64}))}>
                    Galería
        </Button>

        <Fragment >
          <SearchableDropdown
            onItemSelect={(sex) => {
              console.log(sex)
              this.setState({ sex: sex });
              console.log(this.state.sex)
            }}
            mode="outlined"
            underlineColor="transparent"
            itemStyle={styles.searchableDropdown}
            items={sexOption}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Sexo",
                value: this.state.sex.name,
                underlineColorAndroid: "transparent",
                style: styles.textInputSearchable
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />

          <SearchableDropdown
            onItemSelect={(colour) => {
              this.setState({ colour: colour });
            }}
            itemStyle={styles.searchableDropdown}
            items={colorOption}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Color",
                value: this.state.colour.name,
                underlineColorAndroid: "transparent",
                style: styles.textInputSearchable
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />

          <SearchableDropdown
            onItemSelect={(size) => {
              this.setState({ size: size });
            }}
            onRemoveItem={(size, index) => {
              const sizeOption = this.state.selectedItems.filter((ssize) => ssize.id !== size.id);
              this.setState({ selectedItems: sizeOption });
            }}
            itemStyle={styles.searchableDropdown}
            items={sizeOption}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Tamaño",
                value: this.state.size.name,
                underlineColorAndroid: "transparent",
                style: styles.textInputSearchable,
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
          <SearchableDropdown
            onItemSelect={(status) => {
              this.setState({ status: status });
            }}
            onRemoveItem={(status, index) => {
              const statusOption = this.state.selectedItems.filter((sstatus) => sstatus.id !== status.id);
              this.setState({ selectedItems: statusOption });
            }}
            itemStyle={styles.searchableDropdown}
            items={statusOption}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Estado",
                value: this.state.status.name,
                underlineColorAndroid: "transparent",
                style: styles.textInputSearchable
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
           <SearchableDropdown
            onItemSelect={(types) => {
              this.setState({ types: types });
            }}
            onRemoveItem={(types, index) => {
              this.state.types = this.state.selectedItems.filter((stypes) => stypes.id !== types.id);
              this.setState({ selectedItems: this.state.types });
            }}
            itemStyle={styles.searchableDropdown}
            items={this.state.types}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Tipo",
                value: this.state.types.name,
                underlineColorAndroid: "transparent",
                style: styles.textInputSearchable
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
        </Fragment>


        <Button
          style={styles.button}
          mode="contained"
          dark={true}
          disabled={this.isFormIncompleteOrIncorrect()}
          color="#69e000"
          onPress={() => {
            this.props.handlePress(this.state);
          }}>
          Añadir animal
        </Button>
      </View>
    );
  }*/

  render(){
    return( 
      <View style={styles.container} >
        <Stepper
          active={this.state.active}
          content={this.content}
          onNext={() => this.nextHandler()}
          onBack={() => this.setState({ active: this.state.active - 1 })}
          onFinish={() => Alert.alert("Finish")}
        />

      </View>
    )
  }
  
  content = [
    <Step1/>,
    <Step2/>,
    <Step3/>,
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
      {
        this.setState({ active: this.state.active + 1})

      }

    
      default:
        break;
    }

  }
}

const MyComponent = (props) => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};

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