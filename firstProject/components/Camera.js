import React from 'react';
import {Appbar, Button} from 'react-native-paper';
import {StyleSheet, View, Text, Image} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

   const launchCameraOptions = {
        includeBase64: true
    }


export default class Camera extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <>
            <View>
                <Button
                    color="#ABE009"
                    mode="contained"
                    dark={true}
                    onPress={() => launchCamera(null,() => alert('hola'))}>
                    Camara
                </Button>
                  <Button
                    color="#ABE009"
                    mode="contained"
                    dark={true}
                    onPress={() => launchImageLibrary(launchCameraOptions,(response) => console.log(response.assets[0].base64))}>
                    Galería
                </Button>
            </View>
            </>
        )
    }
}