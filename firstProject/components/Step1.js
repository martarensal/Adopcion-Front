import React, { Fragment, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import FormManager from "./FormManager";

var validate = require('validate.js');

export default class Step1 extends React.Component {
  formManager = FormManager.getFormManager()
  
  constructor(props) {
    super(props);
   
    this.state = {
      name: '',
      age: '',
      };
  }

  componentDidMount() {
    this.setState({name: FormManager.getFormManager().getField('name')})
    this.setState({age: FormManager.getFormManager().getField('age')})

    //DEBUG
    FormManager.getFormManager().setField('age', '6')
    FormManager.getFormManager().setField('name', 'Tetesitabebelean')

  }

  render(){
      return (
      <View style={styles.container}>
        {[
          { label: 'Nombre', fieldName: 'name'},
          { label: 'Edad', fieldName: 'age'},

        ].map(x => (
          <View key={x.label}>
            <TextInput
              mode="outlined"
              autoCorrect={false}
              label={x.label}
              value={this.state[x.fieldName]}
              autoCompleteType={x.autoCompleteType}
              onChangeText={(text) => {
                this.setState({[x.fieldName]: text})
                this.formManager.setField(x.fieldName, text)
              }} />
          </View>
        ))}
        </View>)
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

