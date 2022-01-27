import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {getUser} from '../client/UsersApi';

import {Appbar, FAB, Card, Button, Divider} from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
import {ScrollView} from 'react-native-gesture-handler';
import {DrawerActions} from '@react-navigation/native';
var SecurityUtils = require('../utils/SecurityUtils');
import {getMyPublications,deletePublication} from '../client/AnimalApi';
var SecurityUtils = require('../utils/SecurityUtils');

export default class MyLostAnimals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      publications: [],
      paginationInfo: {},
      loading: true,
      user: {},
      page: 0,
      width: 80,
      height: 80,
      base64: 'data:image/png;base64,',
    };

    this.deletePublication = this.deletePublication.bind(this);
    this.handleDetelePublicationResponse = this.handleDetelePublicationResponse.bind(this)
    this.fetchUserData = this.fetchUserData.bind(this)
    this.fetchPublications = this.fetchPublications.bind(this)
    this.handleGetUserResponse = this.handleGetUserResponse.bind(this)
  }

  handleDetelePublicationResponse(response) {
    if (response.ok) {
      console.log('Publicacion borrado');
      this.setState({publications: {}});
    } else {
      console.log('Error');
    }
  }
  deletePublication(idPublication) {
    this.setState({loading: true});
    SecurityUtils.authorizeApi([idPublication], deletePublication).then(
      this.handleDetelePublicationResponse,
    );
  }
  handleGetPublicationResponse(response) {
    response.json().then(data =>
      this.setState({
        publications: this.state.publications.concat(data.pages),
        paginationInfo: data.paginationInfo,
        loading: false,
      }),
    );
  }

  fetchPublications(data) {
    this.setState({user: data})
    SecurityUtils.authorizeApi([data.username, 0, 25], getMyPublications).then(
      this.handleGetPublicationResponse.bind(this),
    );
  }
  handleGetUserResponse(response) {
    response.json().then(data => this.fetchPublications(data));
  }

  fetchUserData() {
    this.setState({loading: true});
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi([info.sub], getUser).then(
        this.handleGetUserResponse.bind(this),
      );
    });
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      'focus',
      this.fetchUserData.bind(this),
    );
  }

  componentWillUnmount() {
    this._unsubscribe();
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
          <View style={styles.container}>
            <Text style={styles.title}> Mis animales perdidos</Text>
             {this.state.publications[0] === undefined ? (
              <>
                <View style={styles.container}>
                  <Text style={styles.label}>
                    Parece que no has añadido ninguna publicación
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Añadir animal perdido', {
                        username: this.state.user.username,
                      })
                    }>
                    <Text style={styles.link}>
                      ¿Quieres añadir un animal perdido ahora?
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : ( 
              this.state.publications.map(publication => {
              return (
                <Card key={publication.publicationDate}>
                  <Divider style={styles.divider} />

                  <Card.Title
                    style={styles.cardStyle}
                    title={
                      publication.publicationDate
                      /* .toISOString()
                      .substring(0, '####-##-##'.length)*/
                    }
                    titleStyle={styles.title}
                    subtitle={publication.description}
                    subtitleStyle={styles.subtitle}
                    left={() => (
                      <Image
                        style={{
                          width: this.state.width,
                          height: this.state.height,
                          borderRadius: 5,
                        }}
                        source={{uri: this.state.base64 + publication.image}}
                      />
                    )}
                  />
                  <Card.Actions>
                      <Button 
                        color="#E67E00"
                        onPress={() =>
                          this.props.navigation.navigate('EditPublicationScreen', {
                            publication: publication,
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
                                onPress: () => this.deletePublication(publication.id),
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
  cardStyle: {
    marginBottom: 60,
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
    marginBottom: 40,
  },
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
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  text: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    marginTop: 5,
  },
  subtitle: {
    marginLeft: 50,
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
  },
  title: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    marginBottom: 15,
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: 30,
  },
});
