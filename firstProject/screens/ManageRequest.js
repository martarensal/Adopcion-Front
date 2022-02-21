import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Alert} from 'react-native';
import {Card, Button} from 'react-native-paper';
import {modifyAnimalState} from '../client/ReservationsApi';
//import {searchTripReservations} from '../client/TripsApi'; HAY QUE HACERLO
import {ScrollView} from 'react-native-gesture-handler';
var SecurityUtils = require('../utils/SecurityUtils');
var LocalTimeUtils = require('../utils/LocalTimeUtils');

export default class ManageRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.route.params.user,
      animal: this.props.route.params.animal,
      requests: [],
      paginationInfo: {},
    };
    this.manageRequest = this.manageRequest.bind(this);
  }

  handleManageRequest(response) {
    if (response.ok) {
      this.setState({reservations: [], page: 0});
      this.fetchTripReservations();
    } else {
      console.log(JSON.stringify(response));
    }
  }

  manageRequest(idRequest, value) {
    let animalStateChangeRequest = {
      newState: value,
    };
    SecurityUtils.authorizeApi(
      [reservationStateChangeRequest, idReservation],
      modifyReservationState,
    ).then(this.handleManageReservation.bind(this));
  }

  handleGetTripReservationsResponse(response) {
    console.log(JSON.stringify(response));
    if (response.ok) {
      response.json().then(data => {
        this.setState({
          reservations: data.pages,
          paginationInfo: data.paginationInfo,
        });
      });
    } else {
      console.log(JSON.stringify(response));
    }
  }

  fetchTripReservations() {
    SecurityUtils.authorizeApi(
      [this.state.trip.id, 0, 10],
      searchTripReservations,
    ).then(this.handleGetTripReservationsResponse.bind(this));
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      'focus',
      this.fetchTripReservations.bind(this),
    );
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return (
          <ScrollView >
        <Text > Solicitud para {this.state.animal.name} </Text>
        {this.state.paginationInfo.totalElements === 0 ? (
          <View >
            <Text >
              No hay ninguna solicitud para tu animal
            </Text>
          </View>
        ) : (
          this.state.requests.map(request => {
            console.log(request);
            return (
              <Card key={request.id}>
                <Card.Content>
                 
                  <Text >
                    Reservado por:{' '}
                    {request.user.name }
                  </Text>
                </Card.Content>
                {request.status === 'ENVIADA' ? (
                  <Card.Actions>
                    <Button
                      onPress={() => {
                        Alert.alert(
                          'Aceptar solicitud',
                          '¿Estás seguro de que desea aceptar la solicitud?',
                          [
                            {
                              text: 'No',
                              style: 'cancel',
                            },
                            {
                              text: 'Sí',
                              onPress: () =>
                                this.manageReservation(
                                  request.id,
                                  'ACEPTADA',
                                ),
                            },
                          ],
                          {cancelable: false},
                        );
                      }}>
                      Aceptar reserva
                    </Button>
                    <Button
                      onPress={() => {
                        Alert.alert(
                          'Rechazar reserva',
                          '¿Estás seguro de que desea rechazar la reserva?',
                          [
                            {
                              text: 'No',
                              style: 'cancel',
                            },
                            {
                              text: 'Sí',
                              onPress: () =>
                                this.manageReservation(
                                  reservation.id,
                                  'RECHAZADA',
                                ),
                            },
                          ],
                          {cancelable: false},
                        );
                      }}
                      color="red">
                      Rechazar reserva
                    </Button>
                  </Card.Actions>
                ) : (
                  undefined
                )}
              </Card>
            );
          })
        )}
      </ScrollView>   
    );
  }
}