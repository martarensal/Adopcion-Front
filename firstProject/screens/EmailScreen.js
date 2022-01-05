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
      name: '',
      phone: '',
      email: '',
      username: '',
      message: '',
      userOrigen: {},
      userDestination: {},
      emailDestination: '',
      loading: true,
      startDate: new Date(),
      endDate: new Date(),
      type: undefined,
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
        name: data.name,
        phone: data.phone,
        email: data.email,
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
  requestType() {
    console.log(this.state.type);

    if (this.state.type == 'shelter') {
      <RequestForm
        startDate={this.state.startDate}
        onChange={startDate => {
          this.setState({
            startDate: startDate,
          }); /*console.log(startDate)*/
        }}
      />;
      //falta enddate
    } else {
      console.log('ey');
    }
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
              <AnimalTypeRequestPicker
                type={this.state.type}
                onChange={type => {
                  this.setState({type: type}); /*console.log(type)*/
                }}
              />
              {this.requestType()}
              <TextInput
                multiline={true}
                label="Pregunta algo sobre el animal"
                value={this.state.message}
                onChangeText={value => this.setState({message: value})}
              />

              <Text>
                {' '}
                Los siguientes datos serán enviados al usuario{' '}
                {this.state.userDestination.username}.
              </Text>
              <Divider />
              <Text> Nombre: {this.state.name}</Text>
              <Divider />
              <Text> Teléfono: {this.state.phone}</Text>
              <Divider />
              <Text> Email: {this.state.email}</Text>
              <Divider />

              <Button
                style={styles.button}
                dark={true}
                mode="contained"
                color="#F5C401"
                onPress={() => this.sendEmail()}>
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
    marginTop: 40,
    marginHorizontal: 10,
    flex: 1,
    padding: 20,
    width: '100%',
  },

  button: {
    width: '100%',
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
