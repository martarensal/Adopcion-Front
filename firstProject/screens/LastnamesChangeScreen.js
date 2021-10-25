import React from 'react';
import {View, StyleSheet} from 'react-native';
import ChangeForm from '../components/ChangeForm';
import {modifyUserLastname} from '../client/UsersApi';
var SecurityUtils = require('../utils/SecurityUtils');

export default class NameChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.changeUserLastname = this.changeUserLastname .bind(this);
  }

  handleChangeLastnameResponse(response) {
    console.log('Apellidos modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.navigate('MyProfileScreen');
  }

  changeUserLastname(userLastnameChangeRequest) {
    let body = {
      newLastname: userLastnameChangeRequest.newValue,
    };
    SecurityUtils.tokenInfo().then(info => {
        console.log(body);
        console.log(info);
      SecurityUtils.authorizeApi([body, info.sub], modifyUserLastname).then(
        this.handleChangeLastnameResponse.bind(this),
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ChangeForm
          value={this.props.route.params.lastnames}
          handlePress={this.changeUserLastname}
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