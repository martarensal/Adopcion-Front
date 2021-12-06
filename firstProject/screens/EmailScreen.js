import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button, Text, Divider} from 'react-native-paper';
import emailjs from 'emailjs-com';
import {getUser} from '../client/UsersApi';
import {Appbar} from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';

var SecurityUtils = require('../utils/SecurityUtils.js');

const styles = StyleSheet.create({
  barra: {
    backgroundColor: '#E67E00',
  },
  logo: {
    fontFamily: 'Butler-Light',
    color: 'white',
    fontSize: 25,
    marginLeft: 14,
    alignSelf: 'center',
  },
  container: {
    marginTop: 40,
    marginHorizontal: 10,
    flex: 1,
    padding: 20,
    width: '100%',
  },
  text: {
    fontFamily: 'OpenSans-Bold',
    color: '#69e000',
    fontSize: 20,
    marginTop: 5,
  },
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
}});

export default class EmailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      phone:'',
      email:'',
      username:'',
      to_name: 'James',
      message: '',
      from_name: 'Marta',
      userOrigen: {},
      userDestination: {},
      emailDestination:'',
      loading: true,
      
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
      this.setState({userDestination: data, loading: false, emailDestination: data.email});    
    });
  }

  async handleGetUserResponse(response) {
    response.json().then(data => {
      console.log(data);
      this.setState({userOrigen: data, loading: false, username: data.username, name: data.name, phone: data.phone, email: data.email});
      
    });
  }
    fetchUserDataDestination(){
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
        <Appbar style={styles.barra}>
          <Text style={styles.logo}>SavePet</Text>
        </Appbar>
        <View style={styles.background}>
          <View style={styles.container}>
            <TextInput
              label="Introduzca aquí la descripción"
              value={this.state.message}
              onChangeText={value => this.setState({message: value})}
            />
            
            <Text> Los siguientes datos serán enviados al usuario {this.state.userDestination.username}.</Text>
            <Divider />
              <Text> Nombre: {this.state.name}</Text>
            <Divider />
              <Text> Teléfono: {this.state.phone}</Text>
            <Divider />
              <Text> Email: {this.state.email}</Text>
            <Divider />

            <Button
              style={styles.button}
              mode="contained"
              dark={true}
              onPress={
                () => this.sendEmail()
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

