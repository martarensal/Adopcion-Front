import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import ErrorText from '../components/ErrorText';
import {userLogin} from '../client/AuthenticationApi';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrorVisible: false,
    };
    this.loginUser = this.loginUser.bind(this);
  }
  handleUserLoginResponse(response) {
    if (response.ok) {
      console.log('Inicio de sesión correcto');
      this.props.navigation.navigate('MainScreen');
      response.json().then(async data => {
        try {
          await AsyncStorage.setItem('ApiKeyAuth', data.apiKey);
          const apiKey = await AsyncStorage.getItem('ApiKeyAuth');
          console.log(apiKey);
        } catch (error) {
          console.error(error);
        }
        console.log(data.apiKey);
      });    
    } 
    else {
      this.setState({isErrorVisible: true});
    }
  }

  loginUser(loginRequest) {
    userLogin(loginRequest)
      .then(this.handleUserLoginResponse.bind(this))
      .catch(error => console.log(error));
  }
  render() {
    return (
      <View style={styles.loginScreen} behavior="padding">
       <Header>¡Hola de nuevo!</Header>
        {this.state.isErrorVisible ? (
          <ErrorText>Usuario o contraseña incorrectos</ErrorText>
        ) : (
          undefined
        )}
        <LoginForm handlePress={this.loginUser} />
        <View style={styles.row}>
          <Text style={styles.label}>¿Aún no tienes una cuenta? </Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('RegistrationScreen')
            }>
            <Text style={styles.link}>Registrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
  },
  label: {
    color: '#525252',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: '#A7E009',
  },
  text: {
    fontFamily: 'OpenSans-Bold',
    color: '#DE740B',
    fontSize: 20,
    marginTop: 5,
  },

});