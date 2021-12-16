import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ChangeForm from '../components/ChangeForm';
import HeaderAppbar from '../components/HeaderAppbar';
import {modifyUserUsername} from '../client/UsersApi';
import LoadingIndicator from '../components/LoadingIndicator';

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
      SecurityUtils.authorizeApi([body, info.sub], modifyUserUsername).then(
        this.handleChangeusernameResponse.bind(this),
      );
    });
  }

  render() {
    return (
      <>
       <HeaderAppbar/>
        <View style={styles.container}>
          <ChangeForm
            value={this.props.route.params.username}
            handlePress={this.changeUserUsername}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  barra: {
    backgroundColor: '#E67E00',
  },
  logo: {
    fontFamily: 'Butler_Light',
    color: 'white',
    fontSize: 25,
    marginLeft: 14,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
