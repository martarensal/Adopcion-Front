import React from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {List, Divider, Button} from 'react-native-paper';
import {Appbar} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import HeaderAppbar from '../components/HeaderAppbar';
import {getUser} from '../client/UsersApi';
var SecurityUtils = require('../utils/SecurityUtils');

export default class LostAnimalDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      base64: 'data:image/png;base64,',
    };
    this.fetchUserData = this.fetchUserData.bind(this);
  }
  handleGetUserResponse(response) {
    response.json().then(data => {
      this.setState({user: data, loading: false});
    });
  }

  fetchUserData() {
    this.setState({loading: true});
    SecurityUtils.authorizeApi(
      [this.props.route.params.publication.user],
      getUser,
    ).then(this.handleGetUserResponse.bind(this));
  }
  componentDidMount() {
    this.fetchUserData();
    console.log(this.props.route.params.publication.user);
  }
  getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '-' + month + '-' + year;
  };
  render() {
    return (
      <>
        <HeaderAppbar />
        <View style={styles.background}>
          <View style={styles.container}>
            <Text style={styles.title}> Información del animal</Text>
            <View style={styles.layout}>
              <Image
                style={styles.image}
                source={{
                  uri:
                    this.state.base64 +
                    this.props.route.params.publication.image,
                }}
              />
              <View style={styles.text}>
                <Text style={styles.text}>
                  Fecha:{' '}
                  {this.getCurrentDate(
                    this.props.route.params.publication.publicationDate,
                  )}
                </Text>
                <Text style={styles.text}>
                  Descripción: {this.props.route.params.publication.description}
                </Text>
                <Divider style={styles.divider} />

                <Text style={styles.text}>Contacto</Text>
                <Divider style={styles.divider} />

                <Text style={styles.text}>Nombre: {this.state.user.name}</Text>

                <Text style={styles.text}>
                  Teléfono: {this.state.user.phone}
                </Text>

                <Text style={styles.text}>Email: {this.state.user.email}</Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    marginVertical: 15,
  },
  layout: {
    flexDirection: 'column',
    textAlign: 'left',
  },
  container: {
    flex: 1,
    width: '100%',
    //alignSelf: 'center',
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  button: {
    width: '100%',
  },
  text: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
    marginVertical: 5,
    flexDirection: 'column',
  },
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    marginVertical: 15,
    textAlign: 'center',
  },
});
