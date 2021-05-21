import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          alignSelf: 'stretch',
        }}>
        <View style={{justifyContent: 'center', marginTop: 200}}>
          <Text
            style={{
              fontFamily: 'Pacifico-Regular',
              color: '#15abe7',
              fontSize: 70,
            }}>
            Uni
            <Text
              style={{
                color: '#69e000',
              }}>
              moove
            </Text>
          </Text>
          <Button
            style={styles.button}
            color="#15abe7"
            mode="contained"
            dark={true}
            onPress={() => {
              this.props.navigation.navigate('RegistrationScreen');
            }}>
            Registrarse
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            dark={true}
            onPress={() => {
              this.props.navigation.navigate('LoginScreen');
            }}
            color="#69e000">
            Iniciar Sesión
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },
});