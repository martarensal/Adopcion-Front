import React, {Fragment, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {modifyAnimalImage} from '../client/AnimalApi';
import {TextInput, Button, HelperText} from 'react-native-paper';
import Camera from '../components/Camera';
import HeaderAppbar from '../components/HeaderAppbar';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
var SecurityUtils = require('../utils/SecurityUtils.js');

var validate = require('validate.js');

const launchCameraOptions = {
  includeBase64: true,
};

export default class AnimalImageChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.changeAnimalImage = this.changeAnimalImage.bind(this);
    this.render = this.render.bind(this);
  }

  handleChangeAnimalImageResponse(response) {
    console.log('Imagen del animal modificada');
    console.log(JSON.stringify(response));
    this.props.navigation.navigate('MyAnimalsScreen');
  }

  changeAnimalImage(animalImageChangeRequest) {
    let body = {
      newAnimalImage: animalImageChangeRequest,
    };
    console.log(body);
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [body, this.props.route.params.id],
        modifyAnimalImage,
      ).then(this.handleChangeAnimalImageResponse.bind(this));
    });
  }

  render() {
    return (
      <>
        <HeaderAppbar />
        <View style={styles.container}>
          <Text style={styles.text}>Cambia la foto del animal </Text>
          <Text style={styles.informationText}>
            Hacer foto en este momento
          </Text>
          <TouchableOpacity
            style={styles.cameraButton}
            mode="contained"
            dark={true}
            onPress={() => {
              launchCamera(launchCameraOptions, response => {
                if (!response.didCancel) {
                  this.changeAnimalImage(response.assets[0].base64);
                }
              });
            }}>
            <Text style={styles.textStyle}> Cámara</Text>
          </TouchableOpacity>
          <Text style={styles.informationText}>
            Elige una foto de la galería
          </Text>

          <TouchableOpacity
            style={styles.cameraButton}
            mode="contained"
            dark={true}
            onPress={() => {
              launchImageLibrary(launchCameraOptions, response => {
                if (!response.didCancel) {
                  this.changeAnimalImage(response.assets[0].base64);
                }
              });
            }}>
            <Text style={styles.textStyle}> Galería </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
  },
  text: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 20,
    marginBottom: 15,
    marginTop: 10,
    marginLeft: 25,
  },
  informationText: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
    marginBottom: 15,
    marginTop: 10,
    marginLeft: 25,
  },
  cameraButton: {
    backgroundColor: '#ABE009',
    marginVertical: '2%',
    height: 40,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 25,
  },
  textStyle:{
    fontSize:15,
        fontFamily: 'RobotoSlab-Regular',
  }
});
