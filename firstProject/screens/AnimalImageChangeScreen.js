import React, {Fragment, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';
import Camera from '../components/Camera';
import {modifyAnimalImage} from '../client/AnimalApi';
import HeaderAppbar from '../components/HeaderAppbar';

import Icon from 'react-native-vector-icons/Ionicons';
var SecurityUtils = require('../utils/SecurityUtils.js');

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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
    this.props.navigation.goBack();
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
        <Text style={styles.title}>Cambia la foto del animal </Text>
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() => {
              launchCamera(launchCameraOptions, response => {
                if (!response.didCancel) {
                  this.changeAnimalImage(response.assets[0].base64);
                }
              });
            }}>
            <Icon size={50} color="#575757" name="camera-outline"></Icon>
            <Text style={styles.text}> Cámara </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              launchImageLibrary(launchCameraOptions, response => {
                if (!response.didCancel) {
                  this.changeAnimalImage(response.assets[0].base64);
                }
              });
            }}>
            <Icon size={50} color="#575757" name="images-outline"></Icon>
            <Text style={styles.text}> Galería </Text>
          </TouchableOpacity>
        </View>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  icons: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  icon: {
    width: 50,
    height: 50,
  },
  container: {
    width: '100%',
    //textAlign: 'center',
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  button: {
    marginTop: 24,
  },
  text: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
    alignContent: 'center',
    marginBottom: 5,
  },
  title: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
    alignContent: 'center',
    marginBottom: 5,
    marginLeft: 60,
    marginVertical: 20,
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
    marginVertical: '2%',
    height: 40,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 25,
  },
  textStyle: {
    fontSize: 18,
  },
});
