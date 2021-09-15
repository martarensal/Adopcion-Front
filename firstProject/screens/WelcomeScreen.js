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
              color: '#F5C401',
              fontSize: 70,
            }}>
            Save
            <Text
              style={{
                color: '#A7E009',
              }}>
              Pet
            </Text>
          </Text>
       
          <Button
            style={styles.button}
            mode="contained"
            dark={true}
            onPress={() => {
              this.props.navigation.navigate('LoginScreen');
            }}
            color="#A7E009">
            Iniciar Sesión
          </Button>
          <Button
            style={styles.button}
            color="#F5C401"
            mode="contained"
            dark={true}
            onPress={() => {
              this.props.navigation.navigate('RegistrationScreen');
            }}>
            Registrarse
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