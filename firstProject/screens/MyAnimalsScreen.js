import React from 'react';
import {getUser} from '../client/UsersApi';
import {getPaginatedAnimalsFromUser, deleteAnimal} from '../client/AnimalApi';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Appbar, FAB, Card, Button} from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
import {ScrollView} from 'react-native-gesture-handler';
import { DrawerActions } from '@react-navigation/native';
var SecurityUtils = require('../utils/SecurityUtils');

export default class MyAnimalsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: [],
      paginationInfo: {},
      loading: true,
      page: 0,
      user: {},
    }

    this.deleteAnimal = this.deleteAnimal.bind(this)
    this.fetchUserDataWithAnimals = this.fetchUserDataWithAnimals.bind(this)
  }
   handleDeteleAnimalResponse(response) {
    if (response.ok) {
      console.log('Animal borrado');
      this.fetchUserDataWithAnimals();
    } else {
      console.log('Error');
    }
  }
  deleteAnimal(idAnimal) {
    //this.setState({loading: true});
    SecurityUtils.authorizeApi(
      [idAnimal],
      deleteAnimal,
    ).then(this.handleDeteleAnimalResponse);
  }
  showMoreAnimals() {
    this.setState({page: this.state.page + 1}, () =>
      this.fetchUserDataWithAnimals(),
    );
  }

   handleGetAnimalsResponse(response) {
    response.json().then(data =>
    
      this.setState({
        animals: this.state.animals.concat(data.pages),
        paginationInfo: data.paginationInfo,
        loading: false,
      }),
      //console.log(data)
      //console.log(this.state.animals)
    );
  }

  handleGetUserResponse(response) {
    response.json().then(data => {
      this.setState({user: data});
      SecurityUtils.authorizeApi(
        [this.state.page, 5, data.username],
        getPaginatedAnimalsFromUser,
      ).then(this.handleGetAnimalsResponse.bind(this));
    });
  }

   fetchUserDataWithAnimals() {
    //if (this.state.page === 0) this.setState({loading: true});

    this.setState({animals: []});

    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi([info.sub], getUser).then(
        this.handleGetUserResponse.bind(this),
      );
    });
  }

  componentDidMount() {
    this.fetchUserDataWithAnimals();
   this._outOfFocus = this.props.navigation.addListener('blur', () =>
      this.setState({animals: [], page: 0}),
    );
  }

  render(){
    return (
      <View style={styles.background}>
          <Appbar style={styles.barra}>
              <Text style={styles.logo}>
                SavePet
              </Text>
          </Appbar>
            <ScrollView style={styles.background}>
            <View style={styles.container}>
              <Text style={styles.text}>Mis animales</Text>
            </View>
            {this.state.animals[0] === undefined ? (
              <>
                <View style={styles.container}>
                  <Text style={styles.label}>
                    Parece que no has añadido ningún animal aún
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('CreateAnimalScreen', {
                        username: this.state.user.username,
                      })
                    }>
                    <Text style={styles.link}>
                      ¿Quieres añadir un animal ahora?
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              this.state.animals.map(animal => {
                return (
                  <Card key={animal.name}>
                    <Card.Title
                      title={animal.name}
                      subtitle={'Sexo: '+ animal.sex +  '\n' + ' Edad: '+ animal.age
                              }
                    />
                    <Card.Actions>
                      <Button
                        onPress={() =>
                          this.props.navigation.navigate('EditAnimalScreen', {
                            animal: animal,
                          })
                        }>
                        Editar
                      </Button>
                      <Button
                        color="red"
                        onPress={() =>
                          Alert.alert(
                            'Confirmación',
                            '¿Está seguro de que quiere borrar el animal? Los animales eliminados no pueden recuperarse.',
                            [
                              {
                                text: 'Cancelar',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              {
                                text: 'Si, estoy seguro',
                                onPress: () => this.deleteAnimal(animal.id),
                              },
                            ],
                            {cancelable: false},
                          )
                        }>
                        Eliminar
                      </Button>
                    </Card.Actions>
                  </Card>
                );
              })
            )}
          </ScrollView>
          
      </View>
  );
  }
}

const styles = StyleSheet.create({
  barra: {
    backgroundColor: '#E67E00',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
    padding: 10,
    width: '100%',
    maxWidth: 340,
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
