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
import {
  getPaginatedPublicationsFromUser,
  deletePublication,
} from '../client/AnimalApi';
var SecurityUtils = require('../utils/SecurityUtils');

export default class MyLostAnimals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      publications: [],
      paginationInfo: {},
      loading: true,
      page: 0,
      user: {},
      width: 80,
      height: 80,
      base64: 'data:image/png;base64,',
    };

    this.deletePublication = this.deletePublication.bind(this);
    this.handleDetelePublicationResponse =
      this.handleDetelePublicationResponse.bind(this);
    this.fetchUserDataWithPublications =
      this.fetchUserDataWithPublications.bind(this);
  }

  handleDetelePublicationResponse(response) {
    if (response.ok) {
      this.setState({publications: [], page: 0});
      this.fetchUserDataWithPublications();
    } else {
      console.log(JSON.stringify(response));
    }
  }
  deletePublication(idPublication) {
    this.setState({loading: true});
    SecurityUtils.authorizeApi([idPublication], deletePublication).then(
      this.handleDetelePublicationResponse,
    );
  }

  showMoreLostAnimals() {
    this.setState({page: this.state.page + 1}, () =>
      this.fetchUserDataWithPublications(),
    );
  }

  handleGetPublicationsResponse(response) {
    response.json().then(data =>
      this.setState({
        publications: this.state.publications.concat(data.pages),
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
        getPaginatedPublicationsFromUser,
      ).then(this.handleGetPublicationsResponse.bind(this));
    });
  }

  fetchUserDataWithPublications() {
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
      this.fetchUserDataWithPublications.bind(this),
    );
    this._outOfFocus = this.props.navigation.addListener('blur', () =>
      this.setState({publications: [], page: 0}),
    );
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '-' + month + '-' + year;
  };
  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    } else {
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
              <Text style={styles.titleText}> Mis animales perdidos</Text>
              {this.state.publications[0] === undefined ? (
                <>
                  <View style={styles.container}>
                    <Text style={styles.label}>
                      Parece que no has añadido ninguna publicación
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate(
                          'Añadir animal perdido',
                          {
                            username: this.state.user.username,
                          },
                        )
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
                    <Card key={publication.id}>
                      <Divider style={styles.divider} />

                      <Card.Title
                        style={styles.cardStyle}
                        title={this.getCurrentDate(publication.publicationDate)}
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
                            source={{
                              uri: this.state.base64 + publication.image,
                            }}
                          />
                        )}
                      />
                      <Card.Actions>
                        <Button
                          color="#E67E00"
                          onPress={() =>
                            this.props.navigation.navigate(
                              'EditPublicationScreen',
                              {
                                publication: publication,
                              },
                            )
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
                                  onPress: () =>
                                    this.deletePublication(publication.id),
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
                  onPress={this.showMoreLostAnimals.bind(this)}>
                  VER MÁS
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
    backgroundColor: 'white',
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
  titleText:{
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    marginBottom: 15,
    marginTop: 20,
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    marginBottom: 15,
    marginTop: 20,
    marginLeft: 40,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: 30,
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
