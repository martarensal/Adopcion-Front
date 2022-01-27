import React from 'react';
import {View, StyleSheet} from 'react-native';
import ChangeForm from '../components/ChangeForm';
import {modifyUserName} from '../client/UsersApi';
import HeaderAppbar from '../components/HeaderAppbar';

var SecurityUtils = require('../utils/SecurityUtils');

export default class NameChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.changeUserName = this.changeUserName.bind(this);
  }

  handleChangenameResponse(response) {
    console.log('Nombre modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.goBack();
  }

  changeUserName(userNameChangeRequest) {
    let body = {
      newName: userNameChangeRequest.newValue,
    };
    SecurityUtils.tokenInfo().then(info => {
      console.log(body);
      console.log(info);
      SecurityUtils.authorizeApi([body, info.sub], modifyUserName).then(
        this.handleChangenameResponse.bind(this),
      );
    });
  }

  render() {
    return (
      <>
        <HeaderAppbar />
        <View style={styles.container}>
          <ChangeForm
            value={this.props.route.params.name}
            handlePress={this.changeUserName}
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
