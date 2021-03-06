import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import ErrorText from '../components/ErrorText';
import {userLogin} from '../client/AuthenticationApi';
import HeaderAppbar from '../components/HeaderAppbar';

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
      response.json().then(async data => {
        try {
          console.log();
          await AsyncStorage.setItem('ApiKeyAuth', data.apiKey);
        } catch (error) {
          console.error(error);
        }
      });
    } else {
      //console.log(response);
      this.setState({isErrorVisible: true});
    }
  }

  loginUser(loginRequest) {
    console.log(loginRequest);
    userLogin(loginRequest)
      .then(this.handleUserLoginResponse.bind(this))
      .catch(error => console.log(error));
  }
  render() {
    return (
      <>
        <HeaderAppbar />
        <View style={styles.loginScreen} behavior="padding">
          <Text style={styles.header}>¡Hola de nuevo!</Text>
          {this.state.isErrorVisible ? (
            <ErrorText>Usuario o contraseña incorrectos</ErrorText>
          ) : undefined}
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
      </>
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
  header: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 25,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: '#E67E00',
  },
});
