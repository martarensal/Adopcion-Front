import React from 'react';
import {View, StyleSheet} from 'react-native';
import ChangeForm from '../components/ChangeForm';
import {modifyAnimalName} from '../client/AnimalApi';
import HeaderAppbar from '../components/HeaderAppbar';

var SecurityUtils = require('../utils/SecurityUtils');

export default class AnimalNameChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.changeAnimalName = this.changeAnimalName.bind(this);
  }

  handleChangeAnimalNameResponse(response) {
    console.log('Nombre animal modificado');
    console.log(JSON.stringify(response));
    this.props.navigation.navigate('MyAnimalsScreen');
  }

  changeAnimalName(animalNameChangeRequest) {
    let body = {
      newAnimalName: animalNameChangeRequest.newValue,
    };
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi([body, this.props.route.params.id], modifyAnimalName).then(
          this.handleChangeAnimalNameResponse.bind(this));
    });
  }

  render() {
    return (
      <>
      <HeaderAppbar/>
      <View style={styles.container}>
        <ChangeForm
          value={this.props.route.params.name}
          handlePress={this.changeAnimalName}
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