import React from 'react';
import {Appbar} from 'react-native-paper';

import {StyleSheet, View, Text, Image} from 'react-native';
import AnimalCreationForm from '../components/AnimalCreationForm';
import {addAnimal} from '../client/UsersApi';
import {DrawerActions} from '@react-navigation/native';
var SecurityUtils = require('../utils/SecurityUtils');
import {ScrollView} from 'react-native-gesture-handler';

//import HeaderAppbar from '../components/HeaderAppbar';

export default class CreateAnimalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrorVisible: false,
    };
  }
  render() {
    return (
      <>
        <View style={styles.background}>
          <Appbar style={styles.barra}>
            <Appbar.Action
              icon="menu"
              onPress={() =>
                this.props.navigation.dispatch(DrawerActions.openDrawer())
              }
            />
            <Text style={styles.logo}>SavePet</Text>
          </Appbar>

          <View style={styles.container} behavior="padding">
            <Text style={styles.text}>Nuevo animal</Text>
            <AnimalCreationForm username={this.props.route.params.username} />
          </View>
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
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '80%',
    //maxWidth: 340,
    alignSelf: 'center',
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    marginBottom: 15,
    marginTop: 20,
    textAlign: 'center',
  },
});
