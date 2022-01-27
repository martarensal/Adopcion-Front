import React from 'react';
import {View, StyleSheet} from 'react-native';
import ChangeForm from '../components/ChangeForm';
import {modifyAnimalAge} from '../client/AnimalApi';
import HeaderAppbar from '../components/HeaderAppbar';

var SecurityUtils = require('../utils/SecurityUtils');

export default class AnimalageChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.changeAnimalAge = this.changeAnimalAge.bind(this);
  }

  handleChangeAnimalAgeResponse(response) {
    console.log('Edad animal modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.goBack();
  }

  changeAnimalAge(animalAgeChangeRequest) {
    let body = {
      newAnimalAge: animalAgeChangeRequest.newValue,
    };
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [body, this.props.route.params.id],
        modifyAnimalAge,
      ).then(this.handleChangeAnimalAgeResponse.bind(this));
    });
  }

  render() {
    return (
      <>
        <HeaderAppbar />
        <View style={styles.container}>
          <ChangeForm
            value={this.props.route.params.age}
            handlePress={this.changeAnimalAge}
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
