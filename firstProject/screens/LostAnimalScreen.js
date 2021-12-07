import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import LostAnimalForm from '../components/LostAnimalForm';
import { DrawerActions } from '@react-navigation/native';
import {addPublication} from '../client/AnimalApi';
import {Button} from 'react-native-paper';

var SecurityUtils = require('../utils/SecurityUtils');
import {ScrollView} from 'react-native-gesture-handler';
import {Appbar} from 'react-native-paper';


export default class LostAnimalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrorVisible: false,
      date: new Date(),
      textDate: '',
      image:'',
    };
    this.addPublication = this.addPublication.bind(this)
  }
  addPublication() {
      let body = {
          description: this.state.description,
          image:this.state.image,
        publicationDate: this.state.date,
      }
    SecurityUtils.authorizeApi([body], addPublication).then(this.handleCreateNewPublicationResponse.bind(this));
  }
    handleCreateNewPublicationResponse(response) {
    if (response.ok) {
      console.log(JSON.stringify(response));
      console.log('Publicacion creada');

    } else {
      console.log(JSON.stringify(response));
      this.setState({isErrorVisible: true});
    }
  }
  componentDidMount(){
      //console.log(this.state.date.toISOString().substring(0, '####-##-##'.length))
  }
  render() {
    return (
      <>
       <Appbar style={styles.barra}>
            <Text style={styles.logo}>SavePet</Text>
        </Appbar>
      <View style={styles.background}>
        <View style={styles.container} behavior="padding">
          <Text style={styles.text}>Nuevo animal</Text>
          <LostAnimalForm 
          description={this.state.description}
          image={this.state.image}
          onDescriptionChange={description =>  this.setState({description: description})}
          onImageChange={image => this.setState({image: image})} 
            />
            <Button
              style={styles.button}
              mode="contained"
              dark={true}
              onPress={this.addPublication}>
              Publicar animal
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
