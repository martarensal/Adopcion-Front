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
import Icon from 'react-native-vector-icons/Ionicons';
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
          multiline={true}
          label="Introduzca aquí la descripción"
          value={this.props.description}
          onChangeText={newDescription =>
            this.props.onDescriptionChange(newDescription)
          }
        />
        <Text style={styles.informativeText}> Añade una foto del animal </Text>

        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() => {
              launchCamera(launchCameraOptions, response => {
                if (!response.didCancel) {
                  this.props.onImageChange(response.assets[0].base64);
                }
              });
            }}>
            <Icon size={50} size={50} color="#575757" name="camera-outline"></Icon>
            <Text style={styles.text}> Cámara </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              launchImageLibrary(launchCameraOptions, response => {
                if (!response.didCancel) {
                  this.props.onImageChange(response.assets[0].base64);
                }
              });
            }}>
            <Icon size={50} size={50} color="#575757" name="images-outline"></Icon>
            <Text style={styles.text}> Galería </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginVertical: 12,
  },
  button: {
    marginTop: 24,
  },
  informativeText: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
    alignContent: 'center',
    marginVertical: 15,
     alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
  ImageIconStyle: {
    width: 20,
    height: 20,
  },
  button: {
    marginTop: 24,
  },
  text: {
    fontFamily: 'RobotoSlab-Regular',
    color: 'black',
    fontSize: 15,
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
