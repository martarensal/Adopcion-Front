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
import {Appbar, FAB, Card, Button, Divider,Title, Paragraph} from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
import {ScrollView} from 'react-native-gesture-handler';
import {DrawerActions} from '@react-navigation/native';

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
      this.setState({animals: [], page: 0});
      this.fetchUserDataWithAnimals();
    } else {
      console.log(JSON.stringify(response));
    }
  }
  deleteAnimal(idAnimal) {
    this.setState({loading: true});
    SecurityUtils.authorizeApi([idAnimal], deleteAnimal).then(
      this.handleDeteleAnimalResponse,
    );
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
    );
  }

  handleGetUserResponse(response) {
    response.json().then(data => {
      this.setState({user: data});
      SecurityUtils.authorizeApi(
        [this.state.page, 6, data.username],
        getPaginatedAnimalsFromUser,
      ).then(this.handleGetAnimalsResponse.bind(this));
    });
  }

  fetchUserDataWithAnimals() {
    if (this.state.page === 0) this.setState({loading: true});
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

    this._outOfFocus = this.props.navigation.addListener('blur', () =>
      this.setState({animals: [], page: 0}),
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
          <Appbar style={styles.barra}>
            <Appbar.Action
              icon="menu"
              onPress={() => {
                this.props.navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            />
            <Text style={styles.logo}>SavePet</Text>
          </Appbar>

          <ScrollView style={styles.background}>
            <Text style={styles.title}> Mis animales</Text>
            <View style={styles.container}>
              {this.state.animals[0] === undefined ? (
                <>
                  <View style={styles.container}>
                    <Text style={styles.label}>
                      Parece que no has a??adido ning??n animal a??n
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('A??adir animal', {
                          username: this.state.user.username,
                        })
                      }>
                      <Text style={styles.link}>
                        ??Quieres a??adir un animal ahora?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                this.state.animals.map(animal => {
                  return (
                    <Card key={animal.id} >
                      <Card.Cover style={styles.image} source={{ uri: this.state.base64 + animal.image }} />
                       <Card.Content>     
                         <View style={styles.textContent}>               
                       <Title style={styles.textStyle}>{animal.name}</Title>
                        <Paragraph style={styles.textStyle}>Ciudad: {animal.city}</Paragraph>
                        <Paragraph style={styles.textStyle}>Especie: {animal.type}</Paragraph>
                        </View>
                        </Card.Content> 
                        <Card.Actions style={styles.button}>
                        <Button
                          color="#F5C401"
                          onPress={() =>
                            this.props.navigation.navigate('AnimalRequestScreen', {
                              idAnimal: animal.id,
                            })
                          }>
                          Solicitudes
                        </Button>
                        <Button
                          color="#E67E00"
                          onPress={() =>
                            this.props.navigation.navigate('EditAnimalScreen', {
                              id: animal.id,
                            })
                          }>
                          Editar
                        </Button>
                        <Button
                          color="red"
                          onPress={() =>
                            Alert.alert(
                              'Confirmaci??n',
                              '??Est?? seguro de que quiere borrar el animal? Los animales eliminados no pueden recuperarse.',
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
              {this.state.page !== this.state.paginationInfo.totalPages - 1 &&
            this.state.paginationInfo.totalElements !== 0 ? (
              <Button
                color="#F05524"
                onPress={this.showMoreAnimals.bind(this)}>
                VER M??S
              </Button>
            ) : undefined}
            </View>
          </ScrollView>
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
  },
  image: {
    height:300,
  },
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
  label: {
    marginLeft: 25,
    marginVertical: 15,
  },
  link: {
    marginLeft: 25,
    color: '#E67E00',
  },
});
