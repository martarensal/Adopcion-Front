import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import RegistrationForm from '../components/RegistrationForm';
import Header from '../components/Header';
import ErrorText from '../components/ErrorText';
import {addUser} from '../client/UsersApi';

export default class RegistrationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrorVisible: false,
    };
    this.registerUser = this.registerUser.bind(this);
  }
  handleAddUserResponse(response) {
    if(response.ok){
      console.log('Usuario registrado');
      console.log(JSON.stringify(response));
      this.props.navigation.navigate('LoginScreen');
    } else {
      this.setState({isErrorVisible: true});
    }
  }
  registerUser(userRegistrationRequest) {
    addUser(userRegistrationRequest)
      .then(this.handleAddUserResponse.bind(this))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View style={styles.registrationScreen} behavior="padding">
        <Header>Registro</Header>
        {this.state.isErrorVisible ? (
          <ErrorText>El usuario o el correo electrónico ya está en uso</ErrorText>
        ) : (
          undefined
        )}
        <RegistrationForm handlePress={this.registerUser} />
        <View style={styles.row}>
          <Text style={styles.label}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  registrationScreen: {
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
    color: '#15abe7',
  },
});