import React from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderAppbar from '../components/HeaderAppbar';
import ChangePasswordForm from '../components/ChangePasswordForm';
import {modifyUserPassword} from '../client/UsersApi';
var SecurityUtils = require('../utils/SecurityUtils');

export default class PasswordChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.changeUserPassword = this.changeUserPassword.bind(this);
  }

  handleChangePasswordResponse(response) {
    console.log('Contraseña modificada');
    console.log(JSON.stringify(response));
    this.props.navigation.goBack();
  }

  changeUserPassword(userPasswordChangeRequest) {
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [userPasswordChangeRequest, info.sub],
        modifyUserPassword,
      ).then(this.handleChangePasswordResponse.bind(this));
    });
  }

  render() {
    return (
      <>
        <HeaderAppbar />
        <View style={styles.container}>
          <ChangePasswordForm handlePress={this.changeUserPassword} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
