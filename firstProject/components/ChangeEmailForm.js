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
};

export default class ChangeEmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmail: '',
    };
  }

  renderHelperText() {
    if (this.state.newEmail.length > 0) {
      let validationResult = validate.single(
        this.state.newEmail,
        validation.email,
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
      <>
        <TextInput label="Actual" value={this.props.value} disabled={true} />
        <TextInput
          label="Nuevo"
          value={this.state.newEmail}
          error={
            this.state.newEmail.length > 0 &&
            validate.single(this.state.newEmail, validation.email)
          }
          onChangeText={value => this.setState({newEmail: value})}
        />
        {this.renderHelperText()}
        <View style={styles.buttonContainer}>
          <Button
            color="#ABE009"
            mode="contained"
            disabled={validate.single(this.state.newEmail, validation.email)}
            dark={true}
            onPress={() => this.props.handlePress(this.state)}>
            Enviar
          </Button>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
