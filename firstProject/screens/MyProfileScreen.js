import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Appbar, Button, List} from 'react-native-paper';
import {getUser} from '../client/UsersApi';
import { DrawerActions } from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import {ScrollView} from 'react-native-gesture-handler';
var SecurityUtils = require('../utils/SecurityUtils.js');

export default class MyProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: true,
    };
  }

  /*handleGetUserResponse(response) {
    response.json().then(data => this.setState({user: data, loading: false}));
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
*/
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
              <Text style={styles.text}>Mi Perfil</Text>
            </View>
            <Text style={styles.informativeText}>Información de mi cuenta</Text>
            <List.Item
              title="Nombre de usuario"
              description={this.state.user.username}
              onPress={() => {
                this.props.navigation.navigate('UsernameChangeScreen', {
                  username: this.state.user.username,
                });
              }}
            />
            <List.Item
              title="Nombre"
              description={this.state.user.name}
              onPress={() => {
                this.props.navigation.navigate('NameChangeScreen', {
                  name: this.state.user.name,
                });
              }}
            />
            <List.Item
              title="Apellidos"
              description={this.state.user.lastname}
              onPress={() => {
                this.props.navigation.navigate('LastnameChangeScreen', {
                  lastname: this.state.user.lastname,
                });
              }}
            />
            <List.Item
              title="Email"
              description={this.state.user.email}
              onPress={() => {
                this.props.navigation.navigate('EmailChangeScreen', {
                  email: this.state.user.email,
                });
              }}
            />
            <List.Item
              title="Contraseña"
              description="***********"
              onPress={() => {
                this.props.navigation.navigate('PasswordChangeScreen');
              }}
            />
            <Text style={styles.informativeText}>Otros</Text>
            <Button
              color="#69e000"
              caretHidden={true}
              style={styles.button}
              onPress={() => SecurityUtils.deleteToken()}>
              Cerrar Sesión
            </Button>
          </ScrollView>
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
    marginTop: 10,
  },
  informativeText: {
    fontFamily: 'OpenSans-Bold',
    color: '#565656',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10,
  },
  button: {
    marginLeft: 0,
    marginBottom: 10,
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  buttonText: {
    textAlign: 'left',
    margin: 0,
  },
  image: {
    width: 100,
    height: 100,
  },
});