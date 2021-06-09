import React from 'react';
import {View, StyleSheet} from 'react-native';
import ChangeForm from '../components/ChangeForm';
import {modifyUserPhone} from '../client/UsersApi';
var SecurityUtils = require('../utils/SecurityUtils');

export default class PhoneChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.changeUserPhone = this.changeUserPhone.bind(this);
  }

  handleChangephoneResponse(response) {
    console.log('Teléfono modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.goBack();
  }

  changeUserPhone(userPhoneChangeRequest) {
    let body = {
      newPhone: userPhoneChangeRequest.newValue,
    };
    SecurityUtils.tokenInfo().then(info => {
        console.log(body);
        console.log(info);
      SecurityUtils.authorizeApi([body, info.sub], modifyUserPhone).then(
        this.handleChangephoneResponse.bind(this),
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ChangeForm
          value={this.props.route.params.phone}
          handlePress={this.changeUserPhone}
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