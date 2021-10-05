import React from 'react';
import {View, StyleSheet} from 'react-native';
import ChangeForm from '../components/ChangeForm';
import {modifyUserLastnames} from '../client/UsersApi';
var SecurityUtils = require('../utils/SecurityUtils');

export default class NameChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.changeUserLastnames = this.changeUserLastnames.bind(this);
  }
  componentDidMount(){
    console.log(this.props.route.params.lastnames)

  }

  handleChangeLastnamesResponse(response) {
    console.log('Apellidos modificado');
    console.log(JSON.stringify(response));

    this.props.navigation.goBack();
  }

  changeUserLastnames(userLastnamesChangeRequest) {
    let body = {
      newLastames: userLastnamesChangeRequest.newValue,
    };
    SecurityUtils.tokenInfo().then(info => {
        console.log(body);
        console.log(info);
      SecurityUtils.authorizeApi([body, info.sub], modifyUserLastnames).then(
        this.handleChangelastnamesResponse.bind(this),
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ChangeForm
          value={this.props.route.params.lastnames}
          handlePress={this.changeUserLastnames}
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