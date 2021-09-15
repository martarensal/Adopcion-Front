import React, { Fragment, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import FormManager from "./FormManager";
import Camera from '../components/Camera';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'

var validate = require('validate.js');

const launchCameraOptions = {
        includeBase64: true
}

export default class Step3 extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render(){
      return (
        <View style ={ styles.container}>
            <Text style={styles.text}>Añade una foto del animal :  </Text>

            <TouchableOpacity style = {styles.cameraButton}
                    mode="contained"
                    dark={true}
                    onPress={() =>{
                        launchCamera(launchCameraOptions,(response) => 
                        {
                          if(!response.didCancel){
                             FormManager.getFormManager().setField('image', response.assets[0].base64)
                          }
                        })
                    }
                     }>
                   <Text style={styles.textStyle}> Camara</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.cameraButton}
                    mode="contained"
                    dark={true}
                    onPress={() =>{
                       launchImageLibrary(launchCameraOptions,(response) => 
                       {
                         if(!response.didCancel){
                           FormManager.getFormManager().setField('image', response.assets[0].base64)
                         }
                       })
                    }
                    }>
                    <Text style={styles.textStyle}> Galería </Text>
                </TouchableOpacity>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 24,
  },
  text: {
    fontFamily: 'OpenSans-Bold',
    color: '#F05524',
    fontSize: 18,
    marginTop: 5,
    paddingLeft:10,
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
    backgroundColor: '#ABE009',
    marginVertical: '5%',
    height: 40,
    width: '80%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 5
  },
  textStyle: {
      fontSize: 18,
  }
});

