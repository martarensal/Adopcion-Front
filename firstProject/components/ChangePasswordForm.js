import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import PasswordInput from './PasswordInput';

export default class ChangePasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      passwordRepeat: '',
    };
  }

  setPassword = sentPasswords => {
    this.setState({
      newPassword: sentPasswords.password,
      passwordRepeat: sentPasswords.passwordRepeat,
    });
  };

  render() {
    return (
      <>
        <PasswordInput onChange={this.setPassword} mode="flat" />
        <View style={styles.buttonContainer}>
          <Button
            color="#ABE009"
            mode="contained"
            disabled={!this.state.newPassword && !this.state.passwordRepeat}
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
