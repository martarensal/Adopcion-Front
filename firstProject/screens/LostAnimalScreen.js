import React from 'react';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import LostAnimalForm from '../components/LostAnimalForm';
import {DrawerActions} from '@react-navigation/native';
import {addPublication} from '../client/AnimalApi';
import {Button, Appbar} from 'react-native-paper';

var SecurityUtils = require('../utils/SecurityUtils');
import {ScrollView} from 'react-native-gesture-handler';

export default class LostAnimalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrorVisible: false,
      date: new Date(),
      textDate: '',
      image: '',
    };
    this.addPublication = this.addPublication.bind(this);
  }
  addPublication() {
    let body = {
      description: this.state.description,
      image: this.state.image,
      publicationDate: this.state.date,
    };
    SecurityUtils.authorizeApi([body], addPublication).then(
      this.handleCreateNewPublicationResponse.bind(this),
    );
  }
  handleCreateNewPublicationResponse(response) {
    if (response.ok) {
      Alert.alert(
                'Confirmación',
                'La publicación del animal perdido ha sido creada',
                [
                  {
                    text: 'Ok',
                    onPress: () =>
                      this.props.navigation.navigate('Mis animales perdidos'),
                  },
                ],
                {cancelable: false},
              )
      console.log('Publicacion creada');
    } else {
      console.log(JSON.stringify(response));
      this.setState({isErrorVisible: true});
    }
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
          <Text style={styles.text}>Animal perdido</Text>

          <View style={styles.container}>
            <LostAnimalForm
              description={this.state.description}
              image={this.state.image}
              onDescriptionChange={description =>
                this.setState({description: description})
              }
              onImageChange={image => this.setState({image: image})}
            />
            <Button
              style={styles.button}
              mode="contained"
              dark={true}
              color="#F5C401"
              onPress={this.addPublication}>
              Publicar
            </Button>
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
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
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
  button: {
    marginBottom: 15,
    width: '100%',
    justifyContent:'flex-end',
  },
});
