import React from 'react';
import {TextInput, HelperText} from 'react-native-paper';
export default class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordRepeat: '',
    };
  }

  passwordIsEqual() {
    return this.state.password === this.state.passwordRepeat;
  }

  render() {
    return (
      <>
        {[
          {
            label: 'Contraseña',
            fieldName: 'password',
            isPassword: true,
            isSecureTextEntry: true,
          },
          {
            label: 'Repetir contraseña',
            fieldName: 'passwordRepeat',
            isPassword: true,
            isSecureTextEntry: true,
          },
        ].map(x => (
          <TextInput
            key={x.label}
            mode={this.props.mode}
            underlineColor="transparent"
            autoCorrect={false}
            label={x.label}
            error={!this.passwordIsEqual()}
            secureTextEntry={x.isSecureTextEntry}
            password={x.isPassword}
            value={this.state[x.fieldName]}
            autoCompleteType={x.autoCompleteType}
            onChangeText={value => {
              this.setState({[x.fieldName]: value});
              this.props.onChange(this.state);
            }}
          />
        ))}
        {!this.passwordIsEqual() ? (
          <HelperText type="error">Las contraseñas no coinciden</HelperText>
        ) : (
          undefined
        )}
      </>
    );
  }
}