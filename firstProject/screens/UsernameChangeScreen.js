import React from 'react';
import {View, StyleSheet} from 'react-native';
import ChangeForm from '../components/ChangeForm';
import {modifyUserUsername} from '../client/UsersApi';
var SecurityUtils = require('../utils/SecurityUtils');

export default class UsernameChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.changeUserUsername = this.changeUserUsername.bind(this);
  }

  handleChangeusernameResponse(response) {
    console.log('Nombre de usuario modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.navigate('MyProfileScreen');
  }

  changeUserUsername(userUsernameChangeRequest) {
    let body = {
      newUsername: userUsernameChangeRequest.newValue,
    };
    SecurityUtils.tokenInfo().then(info => {
        console.log(body);
        console.log(info);
      SecurityUtils.authorizeApi([body, info.sub], modifyUserUsername).then(
        this.handleChangeusernameResponse.bind(this),
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ChangeForm
          value={this.props.route.params.username}
          handlePress={this.changeUserUsername}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});