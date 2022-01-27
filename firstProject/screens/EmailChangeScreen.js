import React from 'react';
import {View, StyleSheet} from 'react-native';
import ChangeEmailForm from '../components/ChangeEmailForm';
import HeaderAppbar from '../components/HeaderAppbar';
import {modifyUserEmail} from '../client/UsersApi';
var SecurityUtils = require('../utils/SecurityUtils');

export default class EmailChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrorVisible: false,
    };
    this.changeUserEmail = this.changeUserEmail.bind(this);
  }

  handleChangeEmailResponse(response) {
    console.log('Email modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.goBack();
  }

  changeUserEmail(userEmailChangeRequest) {
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [userEmailChangeRequest, info.sub],
        modifyUserEmail,
      ).then(this.handleChangeEmailResponse.bind(this));
    });
  }

  render() {
    return (
      <>
      <HeaderAppbar/>
      <View style={styles.container}>
        <ChangeEmailForm
          value={this.props.route.params.email}
          handlePress={this.changeUserEmail}
        />
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