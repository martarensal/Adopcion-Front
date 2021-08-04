import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import AnimalCreationForm from '../components/AnimalCreationForm';
import {addAnimal} from '../client/UsersApi';
var SecurityUtils = require('../utils/SecurityUtils');
import {ScrollView} from 'react-native-gesture-handler';


export default class CreateAnimalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrorVisible: false,
    };
    this.createNewAnimal = this.createNewAnimal.bind(this);
  }

  handleCreateNewAnimalResponse(response) {
    if (response.ok) {
      console.log(JSON.stringify(response));
      console.log('Animal creado');
      this.props.navigation.goBack();
    } else {
      this.setState({isErrorVisible: true});
    }
  }

  createNewAnimal(animalCreationRequest) {
    SecurityUtils.authorizeApi(
      [animalCreationRequest, this.props.route.params.username],
      addAnimal,
    ).then(this.handleCreateNewAnimalResponse.bind(this));
  }

  render() {
    return (
        <View style={styles.container} behavior="padding">
          <Text style={styles.text}>Nuevo animal</Text>
          <AnimalCreationForm handlePress={this.createNewAnimal} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
  },
  text: {
    fontFamily: 'OpenSans-Bold',
    color: '#69e000',
    fontSize: 20,
    marginTop: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
});
