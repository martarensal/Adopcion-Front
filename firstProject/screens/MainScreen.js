import React from 'react';
import {Appbar, Button} from 'react-native-paper';
import {getUser} from '../client/UsersApi';
import {Text, View, StyleSheet, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyProfileScreen from './MyProfileScreen.js';
import { DrawerActions } from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import LoginScreen from './LoginScreen';
var SecurityUtils = require('../utils/SecurityUtils.js');
const Drawer = createDrawerNavigator();

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: true,
    };
    this.startData = this.startData.bind(this);
  }

  handleGetUserResponse(response) {
    response.json().then(data => this.setState({user: data, loading: false}));
  }

  obtainLogedInUserData() {
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi([info.sub], getUser).then(
        this.handleGetUserResponse.bind(this),
      );
    });
  }
  fetchUserData() {
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

  startData() {
    return (
      <View style={styles.background}>
        <Appbar.Header dark={true}> 
        <Appbar.Action icon="menu" onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} />
          <Text style={styles.logo}>Unimoove</Text>
        </Appbar.Header>
        <View style={styles.container}>
          <Text style={styles.helloText}> ¡Hola, {this.state.user.name}!</Text>
          <Text style={styles.underText}>¿Cómo vas hoy a clase?</Text>
          <Button
            style={styles.button}
            color="#15abe7"
            mode="contained"
            dark={true}
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            ¡Quiero publicar un viaje!
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            dark={true}
            color="#69e000"
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            Estoy buscando un viaje
          </Button>
        </View>
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    } else {
      return (
        <Drawer.Navigator edgeWidth={60}>
          <Drawer.Screen name="Inicio" component={this.startData} />
          <Drawer.Screen name="Mi perfil" component={MyProfileScreen} />
          <Drawer.Screen name="Mis coches" component={LoginScreen} />
          <Drawer.Screen name="Mis reservas" component={LoginScreen} />
          <Drawer.Screen name="Mis viajes" component={LoginScreen} />
        </Drawer.Navigator>
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
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  helloText: {
    fontFamily: 'OpenSans-Bold',
    color: '#575757',
    fontSize: 25,
  },
  underText: {
    fontFamily: 'OpenSans-Bold',
    color: '#575757',
    fontSize: 20,
  },
  image: {
    marginTop: 35,
    width: 280,
    height: 280,
  },
  button: {
    marginTop: 25,
  },
});