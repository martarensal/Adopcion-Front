import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button, Text, Divider} from 'react-native-paper';
import emailjs from 'emailjs-com';
import {getUser} from '../client/UsersApi';
import {Appbar} from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
import RequestForm from '../components/RequestForm';
import AnimalTypeRequestPicker from '../components/AnimalTypeRequestPicker';
import HeaderAppbar from '../components/HeaderAppbar';

var SecurityUtils = require('../utils/SecurityUtils.js');

export default class EmailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: '',
      phone: '',
      email: '',
      username: '',
      message: undefined,
      userOrigen: {},
      userDestination: {},
      emailDestination: '',
      loading: true,
      startDate: new Date(),
      endDate: new Date(),
      type: undefined,
      animalName: '',
      animalAge: '',
      animalType: '',
      animalCity: '',
    };
    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail() {
    emailjs
      .send(
        'service_arm8pjk',
        'template_3krsrdn',
        this.state,
        'user_eOb7ryBtIDgcOWIsaMCgO',
      )
      .then(
        result => {
          console.log(result.text);
        },
        error => {
          console.log(error.text);
        },
      );
  }

  async handleGetUserResponseDestination(response) {
    response.json().then(data => {
      console.log(data);
      this.setState({
        userDestination: data,
        loading: false,
        emailDestination: data.email,
      });
    });
  }

  async handleGetUserResponse(response) {
    response.json().then(data => {
      console.log(data);
      this.setState({
        userOrigen: data,
        loading: false,
        username: data.username,
        phone: data.phone,
        email: data.email,
        type: data.type,
        message: data.message,
        animalName: this.props.route.params.animal.name,
        animalAge: this.props.route.params.animal.age,
        animalType: this.props.route.params.animal.type,
        animalCity: this.props.route.params.animal.city,
      });
    });
  }
  fetchUserDataDestination() {
    SecurityUtils.authorizeApi([this.props.route.params.user], getUser).then(
      this.handleGetUserResponseDestination.bind(this),
    );
  }

  fetchUserDataOrigen() {
    SecurityUtils.tokenInfo().then(info => {
      console.log(info);
      SecurityUtils.authorizeApi([info.sub], getUser).then(
        this.handleGetUserResponse.bind(this),
      );
    });
  }

  componentDidMount() {
    //console.log(this.props.route.params.animal)

    this._unsubscribe = this.props.navigation.addListener(
      'focus',
      this.fetchUserDataOrigen.bind(this),
    );
    this._unsubscribe = this.props.navigation.addListener(
      'focus',
      this.fetchUserDataDestination.bind(this),
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
          <HeaderAppbar />
          <View style={styles.background}>
            <View style={styles.container}>
              <Text style={styles.title}> Solicitud por correo </Text>
              <AnimalTypeRequestPicker
                type={this.state.type}
                onChange={type => {
                  this.setState({type: type}); /*console.log(type)*/
                }}
              />
              <Text style={styles.informativeText}>
                Los siguientes datos serán enviados por correo al usuario {this.state.userDestination.username}.
              </Text>
              <Divider style={styles.divider} />
              <Text style={styles.informativeText}>
                {' '}
                Nombre: {this.state.name}
              </Text>
              <Text style={styles.informativeText}>
                {' '}
                Apellidos: {this.state.lastnames}
              </Text>
              <Text style={styles.informativeText}>
                {' '}
                Teléfono: {this.state.phone}
              </Text>
              <Text style={styles.informativeText}>
                {' '}
                Email: {this.state.email}
              </Text>
              <Divider style={styles.divider} />

              <TextInput
                style={styles.textInput}
                multiline={true}
                label="Escribe aqui tus dudas"
                value={this.state.message}
                onChangeText={value => this.setState({message: value})}
              />
              <Button
                style={styles.button}
                dark={true}
                mode="contained"
                color="#F5C401"
                onPress={
                  () => this.sendEmail() /* Alert.alert(
                'Confirmación',
                'Se ha solicitado el animal con éxito, espere a obtener una respuesta por correo',
                [
                  {
                    text: 'Ok',
                    onPress: () =>
                      this.props.navigation.navigate('MainScreen'),
                  },
                ],
                {cancelable: false},
              )*/
                }>
                Buscar
              </Button>
            </View>
          </View>
        </>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flex: 1,
    padding: 20,
    width: '100%',
  },
  informativeText: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
  },
  divider: {
    marginVertical: 20,
  },
  button: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  textInput: {
    marginBottom: 20,
  },
  text: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
    marginVertical: 5,
    marginLeft: 20,
  },
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
    //alignSelf: 'center',
    //alignItems: 'center',
  },
  title: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    marginVertical: 15,
    textAlign: 'center',
  },
});
