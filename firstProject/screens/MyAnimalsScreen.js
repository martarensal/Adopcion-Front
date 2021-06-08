import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Appbar, FAB, Card, Button} from 'react-native-paper';
import {getUser, getAnimalsFromUser, deleteAnimal} from '../client/UsersApi';
import LoadingIndicator from '../components/LoadingIndicator';
import {ScrollView} from 'react-native-gesture-handler';
import { DrawerActions } from '@react-navigation/native';
var SecurityUtils = require('../utils/SecurityUtils');

export default class MyAnimalsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      animals: {},
      loading: false,
    };
    this.deleteAnimal = this.deleteAnimal.bind(this);
    this.handleDeteleAnimalResponse = this.handleDeteleAnimalResponse.bind(this);
    this.fetchUserDataWithAnimals = this.fetchUserDataWithAnimals.bind(this);
  }

  handleDeteleAnimalResponse(response) {
    if (response.ok) {
      console.log('Animal eliminado');
      this.setState({animals: {}});
      this.fetchUserDataWithAnimals();
    } else {
      console.log('Error');
    }
  }

  deleteAnimal(plate) {
    this.setState({loading: true});
    SecurityUtils.authorizeApi(
      [plate, this.state.user.username],
      deleteAnimal,
    ).then(this.handleDeteleAnimalResponse);
  }

  handleGetUserResponse(response) {
    response.json().then(data => {
      this.setState({user: data});
      SecurityUtils.authorizeApi([data.username], getAnimalsFromUser).then(
        this.handleGetAnimalsResponse.bind(this),
      );
    });
  }

  handleGetAnimalsResponse(response) {
    response.json().then(data => this.setState({animals: data, loading: false}));
  }

  fetchUserDataWithAnimals() {
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi([info.sub], getUser).then(
        this.handleGetUserResponse.bind(this),
      );
    });
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      'focus',
      this.fetchUserDataWithAnimals.bind(this),
    );
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    } else {
      return (
        <>
          <Appbar.Header dark={true}>
          <Appbar.Action icon="menu" onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} />
            <Text style={styles.logo}>SavePet</Text>
          </Appbar.Header>
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
              this.state.animals.map(car => {
                return (
                  <Card key={animal.name}>
                    <Card.Title
                      title={animal.age + ' ' + animal.sex}
                      subtitle={animal.name}
                    />
                    <Card.Actions>
                      <Button
                        onPress={() =>
                          this.props.navigation.navigate('EditCarScreen', {
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
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => {
                this.props.navigation.navigate('CreateCarScreen', {
                  username: this.state.user.username,
                });
              }
            }
          />
        </>
      );
    }
  }
}
const styles = StyleSheet.create({
  logo: {
    fontFamily: 'Pacifico-Regular',
    color: 'white',
    fontSize: 25,
    marginLeft: 14,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    marginBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  text: {
    fontFamily: 'OpenSans-Bold',
    color: '#69e000',
    fontSize: 20,
    marginTop: 5,
  },
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  label: {
    fontSize: 16,
    color: '#525252',
  },
  link: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#69e000',
  },
  image: {
    width: 100,
    height: 100,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});