import React from 'react';
import {Appbar, Button} from 'react-native-paper';
import {getUser} from '../client/UsersApi';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import MyProfileScreen from './MyProfileScreen';
import MyAnimalsScreen from './MyAnimalsScreen';

var SecurityUtils = require('../utils/SecurityUtils.js');
const Drawer = createDrawerNavigator();

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: false,
    };
    this.startData = this.startData.bind(this);
    this.customDrawer = this.customDrawer.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Está seguro que quiere cerrar sesión?', [
      {
        text: 'Sí', 
        onPress: () =>  {
          SecurityUtils.deleteToken(); 
        }
      },
      {
        text: 'No'
      }

    ])

  }

  customDrawer(draw){
    return(
      <DrawerContentScrollView{...draw}>
        <DrawerItemList{...draw}/>
        <DrawerItem label = "Cerrar Sesión" onPress={this.handleLogout}  />
      </DrawerContentScrollView>
    )
  }
 
  handleGetUserResponse(response) {
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

  startData() {
    return (
      <View style={styles.background}>
        <Appbar style={styles.barra}>
          <Appbar.Action icon="menu" onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} />
            <Text style={styles.logo}>
              SavePet
            </Text>
        </Appbar>
       
        <View style={styles.container}>
          <Text style={styles.helloText}> ¡Hola, {this.state.user.name}!</Text>
          <Button
            style={styles.button}
            color="#ABE009"
            mode="contained"
            dark={true}
            onPress={() => this.props.navigation.navigate('CreateAnimalScreen', {
                        username: this.state.user.username,
                      })}>
            Añadir publicación de animal
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            dark={true}
            color="#F5C401"
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            Añadir animal perdido
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
        <Drawer.Navigator edgeWidth={60} drawerContent={cositas => <this.customDrawer {...cositas} />}>
          <Drawer.Screen name="Inicio" component={this.startData} />
          <Drawer.Screen name="Mi perfil" component={MyProfileScreen} />
          <Drawer.Screen name="Mis animales" component={MyAnimalsScreen} />
          <Drawer.Screen name="Mis solicitudes" component={MainScreen} />
          <Drawer.Screen name="Animales solicitados por mi" component={MainScreen} />
         
        </Drawer.Navigator>

      );
      }
    

  }
}

const styles = StyleSheet.create({
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