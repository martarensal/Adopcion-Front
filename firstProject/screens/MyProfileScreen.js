import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Appbar, Button, List} from 'react-native-paper';
import {getUser} from '../client/UsersApi';
import {DrawerActions} from '@react-navigation/native';
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
    this.fetchUserData = this.fetchUserData.bind(this);
  }

  handleGetUserResponse(response) {
    response.json().then(data => {
      console.log(data);
      this.setState({user: data, loading: false});
    });
  }

  fetchUserData() {
    this.setState({loading: true});
    SecurityUtils.tokenInfo().then(info => {
      console.log(info);
      SecurityUtils.authorizeApi([info.sub], getUser).then(
        this.handleGetUserResponse.bind(this),
      );
    });
  }

  componentDidMount() {
    /*this._unsubscribe = this.props.navigation.addListener(
      'focus',
      this.fetchUserData.bind(this),
    );*/
    this.fetchUserData();
  }

  componentWillUnmount() {
    //this._unsubscribe();
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
              onPress={() =>
                this.props.navigation.dispatch(DrawerActions.openDrawer())
              }
            />
            <Text style={styles.logo}>SavePet</Text>
          </Appbar>
          <Text style={styles.informativeText}>Información de mi cuenta</Text>
          <View style={styles.container}>
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
              description={this.state.user.lastnames}
              onPress={() => {
                this.props.navigation.navigate('LastnamesChangeScreen', {
                  lastnames: this.state.user.lastnames,
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
              title="Teléfono"
              description={this.state.user.phone}
              onPress={() => {
                this.props.navigation.navigate('PhoneChangeScreen', {
                  phone: this.state.user.phone,
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
          </View>
        </>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 25,
  },
  button: {
    color: '#D99748',
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
  informativeText: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    marginBottom: 15,
    marginTop: 20,
    textAlign: 'center',
  },
});
