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
import {Appbar, FAB, Card, Button, Divider, Title, Paragraph} from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
import {ScrollView} from 'react-native-gesture-handler';
import {DrawerActions} from '@react-navigation/native';

var SecurityUtils = require('../utils/SecurityUtils');

export default class MyRequestScreen extends React.Component {
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
        [this.state.page, 20, data.username],
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
                      ??Quieres adoptar/acoger un animal ahora?
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              this.state.requests.map(request => {
                return (
                  <Card key={request.id} >
                   <Card.Content>     
                     <View style={styles.textContent}>               
                   <Title style={styles.textStyle}>{request.status}</Title>
                    <Paragraph style={styles.textStyle}>Solicitud: {request.type}</Paragraph>
                    <Paragraph style={styles.textStyle}>Fecha: {request.startDate}</Paragraph>
                    </View>
                    </Card.Content> 
                    <Card.Actions>
                      <Button
                        color="red"
                        onPress={() =>
                          Alert.alert(
                            'Confirmaci??n',
                            '??Est?? seguro de que quiere borrar la solicitud?',
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
