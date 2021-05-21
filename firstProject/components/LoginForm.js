import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {[
          {label: 'Nombre de usuario', fieldName: 'username'},
          {
            label: 'Contraseña',
            fieldName: 'password',
            isPassword: true,
            isSecureTextEntry: true,
          },
        ].map(x => (
          <TextInput
            mode="outlined"
            underlineColor="transparent"
            autoCorrect={false}
            key={x.label}
            label={x.label}
            secureTextEntry={x.isSecureTextEntry}
            password={x.isPassword}
            value={this.state[x.fieldName]}
            autoCompleteType={x.autoCompleteType}
            onChangeText={value => this.setState({[x.fieldName]: value})}
          />
        ))}

        <Button
          style={styles.button}
          mode="contained"
          dark={true}
          color="#69e000"
          onPress={() => {
            this.props.handlePress(this.state);
          }}>
          Iniciar Sesión
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