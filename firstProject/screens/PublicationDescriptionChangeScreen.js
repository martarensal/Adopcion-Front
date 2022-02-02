import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ChangeForm from '../components/ChangeForm';
import HeaderAppbar from '../components/HeaderAppbar';
import {modifyPublicationDescription} from '../client/AnimalApi';
import LoadingIndicator from '../components/LoadingIndicator';

var SecurityUtils = require('../utils/SecurityUtils');

export default class PublicationDescriptionChangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.changeDescription = this.changeDescription.bind(this);
  }

  handleChangeDescriptionResponse(response) {
    console.log('Descripcion modificada');
    console.log(JSON.stringify(response));
    this.props.navigation.navigate('Mis animales perdidos');
  }

  changeDescription(descriptionChangeRequest) {
    let body = {
      newPublicationDescription: descriptionChangeRequest.newValue,
    };
    SecurityUtils.authorizeApi(
      [body, this.props.route.params.id],
      modifyPublicationDescription,
    ).then(this.handleChangeDescriptionResponse.bind(this));
  }

  render() {
    return (
      <>
        <HeaderAppbar />
        <View style={styles.container}>
          <ChangeForm
            value={this.props.route.params.description}
            handlePress={this.changeDescription}
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
