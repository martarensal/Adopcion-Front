import React, {Fragment, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
var SecurityUtils = require('../utils/SecurityUtils.js');

import {TextInput, Button, HelperText} from 'react-native-paper';
import Camera from '../components/Camera';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
var validate = require('validate.js');

const launchCameraOptions = {
  includeBase64: true,
};

export default class LostAnimalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      loading: false,
      user: {},
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          label="Introduzca aquí la descripción"
          value={this.props.description}
          onChangeText={newDescription =>
            this.props.onDescriptionChange(newDescription)
          }
        />
        <TouchableOpacity
          style={styles.cameraButton}
          mode="contained"
          dark={true}
          onPress={() => {
            launchCamera(launchCameraOptions, response => {
              if (!response.didCancel) {
                this.props.onImageChange(response.assets[0].base64);
              }
            });
          }}>
          <Text style={styles.textStyle}> Camara</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cameraButton}
          mode="contained"
          dark={true}
          onPress={() => {
            launchImageLibrary(launchCameraOptions, response => {
              if (!response.didCancel) {
                this.props.onImageChange(response.assets[0].base64);
              }
            });
          }}>
          <Text style={styles.textStyle}> Galería </Text>
        </TouchableOpacity>
      </View>
    );
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

  button: {
    marginTop: 24,
  },
  text: {
    fontFamily: 'OpenSans-Bold',
    color: '#F05524',
    fontSize: 18,
    marginTop: 5,
    paddingLeft: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textStyle: {
    fontSize: 18,
  },
});
