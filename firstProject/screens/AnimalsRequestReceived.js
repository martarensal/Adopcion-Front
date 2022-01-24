import React from 'react';
import {getUser} from '../client/UsersApi';
import {getPaginatedRequestFromUser, deleteRequest} from '../client/RequestApi';
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

export default class AnimalsRequestReceived extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: {},
      paginationInfo: {},
      loading: true,
      page: 0,
      user: {},
    };

    this.deleteRequest = this.deleteRequest.bind(this);
    this.handleDeteleRequestResponse =
      this.handleDeteleRequestResponse.bind(this);
    this.fetchUserDataWithRequests = this.fetchUserDataWithRequests.bind(this);
  }

  handleDeteleRequestResponse(response) {
    console.log(response);
    if (response.ok) {
      console.log('Solicitud borrada');
      this.setState({requests: {}});
      this.fetchUserDataWithRequests();
    } else {
      console.log('Error');
    }
  }
  deleteRequest(idRequest) {
    this.setState({loading: true});
    SecurityUtils.authorizeApi([idRequest], deleteRequest).then(
      this.handleDeteleRequestResponse,
    );
  }

  handleGetRequestsResponse(response) {
    response.json().then(data =>
      this.setState({
        requests: this.state.requests.concat(data.pages),
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
        getPaginatedRequestFromUser,
      ).then(this.handleGetRequestsResponse.bind(this));
    });
  }

  fetchUserDataWithRequests() {
    this.setState({requests: []});
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi([info.sub], getUser).then(
        this.handleGetUserResponse.bind(this),
      );
    });
  }

  componentDidMount() {
    this.fetchUserDataWithRequests();
    this._outOfFocus = this.props.navigation.addListener('blur', () =>
      this.setState({requests: [], page: 0}),
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
            <Text style={styles.title}> Tus solicitudes</Text>
                      <View style={styles.container}>

            {this.state.requests[0] === undefined ? (
              <>
                <View style={styles.container}>
                  <Text style={styles.label}>
                    Parece que no tienes ninguna solicitud
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('NewSearchAnimalScreen', {
                        username: this.state.user.username,
                      })
                    }>
                    <Text style={styles.link}>
                      ¿Quieres adoptar/acoger un animal ahora?
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              this.state.requests.map(request => {
                return (
                    <View style={styles.container}>
                  <Card key={request.id}>
                
                    <Card.Title
                      title={request.status}
                      titleStyle={styles.name}
                      subtitle={         
                            'Solicitud ' + request.type +
                         
                            'Fecha' + request.startDate +
                        
                            '-' + request.endDate 
                                                
                        }
                      subtitleStyle={styles.subtitle}
                    />

                    <Card.Actions>
                      <Button
                        color="red"
                        onPress={() =>
                          Alert.alert(
                            'Confirmación',
                            '¿Está seguro de que quiere borrar la solicitud?',
                            [
                              {
                                text: 'Cancelar',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              {
                                text: 'Si, estoy seguro',
                                onPress: () => this.deleteRequest(request.id),
                              },
                            ],
                            {cancelable: false},
                          )
                        }>
                        Eliminar
                      </Button>
                    </Card.Actions>
                  </Card>
                  </View>
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
     alignContent: 'center',
    //alignItems: 'center',
  },
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  divider: {
    marginBottom: 20,
  },
  allText: {
    marginVertical: 40,
   
  },
  informativeText: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
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
  label: {
    marginLeft: 25,
    marginVertical: 15,
  },
  link: {
    marginLeft: 25,
    color: '#E67E00',
  },
});
/*

   
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
import {getUser} from '../client/UsersApi';
import {modifyRequestStatus, getPaginatedRequestsFromUser} from '../client/RequestApi';
import { DrawerActions } from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import {ScrollView} from 'react-native-gesture-handler';
var SecurityUtils = require('../utils/SecurityUtils');

export default class MyRequestsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      requests: [],
      paginationInfo: {},
      loading: true,
      page: 0,
    };
    this.cancelTrip = this.cancelTrip.bind(this);
  }

  renderStatusText(state) {
    let message;
    switch (state) {
      case 0:
        message = 'ENVIADA';
        break;
      case 1:
        message = 'ACEPTADA';
        break;
      case 2:
        message = 'RECHAZADA';
        break;
    }
    return message;
  }

  handleCancelRequestResponse(response) {
    if (response.ok) {
      this.setState({requests: [], page: 0});
      this.fetchUserDataWithTrips();
    } else {
      console.log(JSON.stringify(response));
    }
  }

  cancelTrip(idTrip) {
    let RequestStateChangeRequest = {
      newStatus: 2,
    };

    SecurityUtils.authorizeApi(
      [requestStateChangeRequest, idTrip],
      modifyRequestState,
    ).then(this.handleCancelRequestResponse.bind(this));
  }

  showMoreRequests() {
    this.setState({page: this.state.page + 1}, () =>
      this.fetchUserDataWithRequests(),
    );
  }

  handleGetRequestsResponse(response) {
    response.json().then(data =>
      this.setState({
        requests: this.state.requests.concat(data.pages),
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
        getPaginatedRequestsFromUser,
      ).then(this.handleGetRequestsResponse.bind(this));
    });
  }

  fetchUserDataWithTrips() {
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
      this.fetchUserDataWithTrips.bind(this),
    );

    this._outOfFocus = this.props.navigation.addListener('blur', () =>
      this.setState({trips: [], page: 0}),
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
            <Text style={styles.logo}>Unimoove</Text>
          </Appbar.Header>
          <ScrollView style={styles.background}>
            <View style={styles.container}>
              <Image
                source={require('../assets/img/trip.png')}
                style={styles.image}
              />
              <Text style={styles.text}>Mis viajes</Text>
            </View>
            {this.state.paginationInfo.totalElements === 0 ? (
              <>
                <View style={styles.container}>
                  <Text style={styles.label}>
                    Parece que no has añadido ningún viaje aún
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('CreateTripScreen', {
                        username: this.state.user.username,
                      })
                    }>
                    <Text style={styles.link}>
                      ¿Quieres añadir un viaje ahora?
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              this.state.trips.map(trip => {
                return (
                  <Card key={trip.id}>
                    <Card.Content>
                      <Text style={styles.tripInfo}>
                        De: {trip.departurePlace}
                      </Text>
                      <Text style={styles.tripInfo}>
                        A: {trip.arrivalPlace}
                      </Text>
                      <Text style={styles.tripInfo}>Estado: {this.renderStatusText(trip.state)}</Text>
                    </Card.Content>
                    <Card.Actions>
                      <Button
                        onPress={() =>
                          this.props.navigation.navigate('TripDetailScreen', {
                            trip: trip,
                            user: this.state.user,
                          })
                        }>
                        Detalles
                      </Button>
                      {trip.state <= 1 ? (
                        <Button
                          onPress={() =>
                            this.props.navigation.navigate(
                              'ManageReservations',
                              {
                                trip: trip,
                                user: this.state.user,
                              },
                            )
                          }>
                          Reservas
                        </Button>
                      ) : (
                        undefined
                      )}

                      {trip.state <= 1 ? (
                        <Button
                          color="red"
                          onPress={() => {
                            Alert.alert(
                              'Cancelar Viaje',
                              '¿Estás seguro de que desea cancelar el viaje?',
                              [
                                {
                                  text: 'No',
                                  style: 'cancel',
                                },
                                {
                                  text: 'Sí',
                                  onPress: () => this.cancelTrip(trip.id),
                                },
                              ],
                              {cancelable: false},
                            );
                          }}>
                          Cancelar viaje
                        </Button>
                      ) : (
                        undefined
                      )}
                    </Card.Actions>
                  </Card>
                );
              })
            )}
            {this.state.page !== this.state.paginationInfo.totalPages - 1 &&
            this.state.paginationInfo.totalElements !== 0 ? (
              <Button onPress={this.showMoreTrips.bind(this)}>
                MOSTRAR MÁS
              </Button>
            ) : (
              undefined
            )}
          </ScrollView>
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => {
              this.props.navigation.navigate('CreateTripScreen', {
                username: this.state.user.username,
              });
            }}
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
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  text: {
    fontFamily: 'OpenSans-Bold',
    color: '#69e000',
    fontSize: 20,
    marginTop: 5,
  },
  image: {
    width: 100,
    height: 100,
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  tripInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
});
*/
