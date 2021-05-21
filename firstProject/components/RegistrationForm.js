import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';
var validate = require('validate.js');
const validation = {
  email: {
    email: {
      message: 'Por favor introduzca un email válido',
    },
    presence: true,
  },
  username: {
    format: {
      pattern: '[a-zA-Z0-9]+',
      flags: 'i',
      message:
        'El nombre de usuario debe ser alfanúmerico y no debe contener espacios',
    },
    presence: true,
  },
};

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      role: 0,
      lastname: '',
      name: '',
      password: '',
      phone:'',
      username: '',
      passwordRepeat: '',
    };
    this.renderHelperText = this.renderHelperText.bind(this);
  }

  isFormIncompleteOrIncorrect() {
    return (
      validate(this.state, validation) !== undefined ||
      !this.state.name ||
      !this.state.lastname ||
      !this.state.password ||
      !this.state.passwordRepeat
    );
  }

  setPassword = sentPasswords => {
    this.setState({
      password: sentPasswords.password,
      passwordRepeat: sentPasswords.passwordRepeat,
    });
  };


  renderHelperText(fieldName) {
    if (this.state[fieldName].length > 0) {
      let validationResult = validate.single(
        this.state[fieldName],
        validation[fieldName]
      );
      if (validationResult !== undefined) {
        return (
          <HelperText type="error" padding="none">
            {validationResult[0]}
          </HelperText>
        );
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {[
          {
            label: 'Nombre de usuario',
            fieldName: 'username',
          },
          {label: 'Nombre', fieldName: 'name'},
          {label: 'Apellidos', fieldName: 'lastname'},
          {
            label: 'Email',
            fieldName: 'email',
            autoCompleteType: 'email',
          },
        ].map(x => (
          <View key={x.label}>
            <TextInput
              mode="outlined"
              underlineColor="transparent"
              autoCorrect={false}
              label={x.label}
              error={
                this.state[x.fieldName].length > 0 &&
                validate.single(
                  this.state[x.fieldName],
                  validation[x.fieldName],
                )
              }
              secureTextEntry={x.isSecureTextEntry}
              password={x.isPassword}
              value={this.state[x.fieldName]}
              autoCompleteType={x.autoCompleteType}
              onChangeText={value => this.setState({[x.fieldName]: value})}
            />
            {this.renderHelperText(x.fieldName)}
          </View>
        ))}
       
        <Button
          style={styles.button}
          mode="contained"
          dark={true}
          disabled={this.isFormIncompleteOrIncorrect()}
          color="#69e000"
          onPress={() => {
            this.props.handlePress(this.state);
          }}>
          Aceptar
        </Button>
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
});