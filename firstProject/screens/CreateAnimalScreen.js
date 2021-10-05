import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import AnimalCreationForm from '../components/AnimalCreationForm';
import {addAnimal} from '../client/UsersApi';
var SecurityUtils = require('../utils/SecurityUtils');
import {ScrollView} from 'react-native-gesture-handler';
import {Appbar} from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';

export default class CreateAnimalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrorVisible: false,
    };
  }

  render() {
    return (
      <View style={styles.background}>
          <Appbar style={styles.barra}>
              <Text style={styles.logo}>
                SavePet
              </Text>
          </Appbar>
        <View style={styles.container} behavior="padding">
          <Text style={styles.text}>Nuevo animal</Text>
          <AnimalCreationForm 
          username={this.props.route.params.username}/>
        </View>
      </View>
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
  background:{
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
    backgroundColor: '#fafafa',
  },
  text: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    marginTop: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
});
