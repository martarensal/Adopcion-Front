import React from 'react';
import {Appbar, Button} from 'react-native-paper';
import {getUser} from '../client/UsersApi';
import {Text, View, StyleSheet, Alert, Image} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import MyProfileScreen from './MyProfileScreen';
import MyAnimalsScreen from './MyAnimalsScreen';
import CreateAnimalScreen from './CreateAnimalScreen';
import LostAnimalScreen from './LostAnimalScreen';
import MyRequestScreen from './MyRequestScreen';
import AnimalsRequestReceived from './AnimalsRequestReceived';
import MyLostAnimals from './MyLostAnimals';
import LostAnimalsListScreen from './LostAnimalsListScreen';
import NewSearchAnimalScreen from './NewSearchAnimalScreen'

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
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Está seguro que quiere cerrar sesión?', [
      {
        text: 'Sí',
        onPress: () => {
          SecurityUtils.deleteToken();
        },
      },
      {
        text: 'No',
      },
    ]);
  };

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
          <Appbar.Action
            icon="menu"
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.openDrawer())
            }
          />
          <Text style={styles.logo}>SavePet</Text>
        </Appbar>

        <View style={styles.container}>
          <Image
            source={require('../assets/img/masrectoesquinita.png')}
            style={styles.image}
          />
          <Text style={styles.helloText}> Bienvenido a SavePet, {this.state.user.name}</Text>
              <Text style={styles.text}> ¿Quieres adoptar o acoger un animal?</Text>
          <View style={styles.buttons}>
          <Button 
              dark={true}
              mode='contained'
              color='#F5C401'

            onPress={() =>
              this.props.navigation.navigate('NewSearchAnimalScreen')
            }>
            Buscar animal
          </Button>
          <Text style={styles.text}> Ver las publicaciones de animales perdidos </Text>

          <Button style={styles.button}
                dark={true}
                mode='contained'
                color='#F5C401'

            onPress={() =>
              this.props.navigation.navigate('LostAnimalsListScreen')
            }>
            Animales perdidos
          </Button>
          </View>
         
        </View>
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    } else {
      return (
        <Drawer.Navigator
          edgeWidth={60}>
          <Drawer.Screen name="Inicio" component={this.startData} />
          <Drawer.Screen name="MyProfileScreen" component={MyProfileScreen} />
          <Drawer.Screen name="MyAnimalsScreen" component={MyAnimalsScreen} />
          <Drawer.Screen name="MyRequestScreen" component={MyRequestScreen} />
          <Drawer.Screen
            name="MyLostAnimals"
            component={MyLostAnimals}
          />
          <Drawer.Screen
            name="CreateAnimalScreen"
            initialParams={{username: this.state.user.username}}
            component={CreateAnimalScreen}
          />
          <Drawer.Screen
            name="LostAnimalScreen"
            component={LostAnimalScreen}
          />
          <Drawer.Screen
            name="AnimalsRequestReceived"
            component={AnimalsRequestReceived}
          />
           <Drawer.Screen
            name="LostAnimalsListScreen"
            component={LostAnimalsListScreen}
          />
          <Drawer.Screen
            name="NewSearchAnimalScreen"
            component={NewSearchAnimalScreen}
          />
        </Drawer.Navigator>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  background: {
    flex: 1,
  },
  barra: {
    backgroundColor: '#E67E00',
  },
  logo: {
    fontFamily: 'RobotoSlab-Regular',
    color: 'white',
    fontSize: 25,
    marginLeft: 14,
    alignSelf: 'center',
  },
  helloText: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 25,
    marginBottom: 15,
  },
  text:{
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
    alignContent: 'center',
    marginBottom: 5,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 216,
    marginBottom: 15,
  },
  button:{
    marginBottom:15,
    color:'#D99748',

  },
  buttons: {
    justifyContent: 'space-evenly',
  },
});
