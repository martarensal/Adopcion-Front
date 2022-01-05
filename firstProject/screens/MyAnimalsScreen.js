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
import {Appbar, FAB, Card, Button, Divider} from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
import {ScrollView} from 'react-native-gesture-handler';
import {DrawerActions} from '@react-navigation/native';

var SecurityUtils = require('../utils/SecurityUtils');

export default class MyAnimalsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: {},
      paginationInfo: {},
      loading: true,
      page: 0,
      user: {},
      base64: 'data:image/png;base64,',
      width: 80,
      height: 80,
    };

    this.deleteAnimal = this.deleteAnimal.bind(this);
    this.handleDeteleAnimalResponse =
      this.handleDeteleAnimalResponse.bind(this);
    this.fetchUserDataWithAnimals = this.fetchUserDataWithAnimals.bind(this);
  }

  handleDeteleAnimalResponse(response) {
    if (response.ok) {
      console.log('Animal borrado');
      this.setState({animals: {}});
      this.fetchUserDataWithAnimals();
    } else {
      console.log('Error');
    }
  }
  deleteAnimal(idAnimal) {
    this.setState({loading: true});
    SecurityUtils.authorizeApi([idAnimal], deleteAnimal).then(
      this.handleDeteleAnimalResponse,
    );
  }

  handleGetAnimalsResponse(response) {
    response.json().then(data =>
      this.setState({
        animals: this.state.animals.concat(data.pages),
        paginationInfo: data.paginationInfo,
        loading: false,
      }),
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

  render() {
    return (
      <>
        <Appbar style={styles.barra}>
          <Appbar.Action
            icon="menu"
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.openDrawer())
            }
          />
          <Text style={styles.logo}>SavePet</Text>
        </Appbar>
        
        <ScrollView style={styles.background}>
          <Text style={styles.title}> Tus animales</Text>
          <View style={styles.container}>
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
                  <Card key={animal.id}>
                    <Card.Title
                      title={animal.name}
                      titleStyle={styles.name}
                      subtitle={
                        'Sexo: ' +
                        animal.sex +
                        '\n' +
                        ' Edad: ' +
                        animal.age +
                        ' Ciudad: ' +
                        animal.city
                      }
                      subtitleStyle={styles.subtitle}
                      left={() => (
                        <Image
                          style={{
                            width: this.state.width,
                            height: this.state.height,
                            borderRadius: 5,
                          }}
                          source={{uri: this.state.base64 + animal.image}}
                        />
                      )}
                    />

                    <Card.Actions>
                      <Button
                        color="#E67E00"
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
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  divider: {
    marginBottom: 20,
  },
  text: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 25,
    marginBottom: 15,
  },
  subtitle: {
    marginLeft: 30,
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    marginBottom: 15,
    marginTop: 20,
    textAlign: 'center',
  },
  name: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    marginLeft: 30,
    marginBottom: 15,
    marginTop: 20,
  },
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
  image: {
    borderRadius: 5,
    marginTop: 30,
  },
});
