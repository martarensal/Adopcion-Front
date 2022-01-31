import React from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {List} from 'react-native-paper';
import {Appbar} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import HeaderAppbar from '../components/HeaderAppbar';
import {getAnimal} from '../client/AnimalApi';

var SecurityUtils = require('../utils/SecurityUtils');


export default class EditAnimalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: 'data:image/png;base64,',
      width: 0,
      height: 0,
      animal: {},
    };
  }
    handleGetAnimalResponse(response) {
    response.json().then(data => {
      console.log(data);
      this.setState({animal: data, loading: false});
    });
  }

  fetchAnimalData() {
     Image.getSize(
      this.state.base64 + this.props.route.params.animal.image,
      (width, height) => {
        screen_percentage = 0.55;
        this.setState({
          width:
            ((Dimensions.get('screen').width * screen_percentage) / width) *
            width,
          height:
            ((Dimensions.get('screen').height * screen_percentage) / height) *
            height,
        });
      },
    );
    this.setState({loading: true});
      SecurityUtils.authorizeApi([this.props.route.params.animal.id], getAnimal).then(
        this.handleGetAnimalResponse.bind(this),
      );
  }

  componentDidMount() {
   
    this._unsubscribe = this.props.navigation.addListener(
      'focus',
      this.fetchAnimalData.bind(this),
    );
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return (
      <>
        <HeaderAppbar />
        <ScrollView style={styles.background}>
          <View style={styles.container}>
            <Text style={styles.title}>
              {' '}
              Editar perfil de {this.state.animal.name}{' '}
            </Text>
            <List.Item
              title="Nombre"
              description={this.state.animal.name}
              onPress={() => {
                this.props.navigation.navigate('AnimalNameChangeScreen', {
                  id: this.state.animal.id,
                  name: this.state.animal.name,
                });
              }}
            />
            <List.Item
              title="Foto"
              onPress={() => {
                this.props.navigation.navigate('AnimalImageChangeScreen', {
                  id: this.state.animal.id,
                  image: this.state.animal.image,
                });
              }}
            />
            <Image
              style={{
                width: this.state.width,
                height: this.state.height,
                borderRadius: 5,
                marginLeft: 25,
              }}
              source={{
                uri: this.state.base64 + this.props.route.params.animal.image,
              }}
            />
            <List.Item
              title="Edad"
              description={this.state.animal.age}
              onPress={() => {
                this.props.navigation.navigate('AnimalAgeChangeScreen', {
                  id: this.state.animal.id,
                  age: this.state.animal.age,
                });
              }}
            />
            <List.Item
              title="Sexo"
              description={this.state.animal.sex}
              onPress={() => {
                this.props.navigation.navigate('AnimalSexChangeScreen', {
                 id: this.state.animal.id,
                  sex: this.state.animal.sex,
                });
              }}
            />
            <List.Item
              title="Color"
              description={this.state.animal.colour}
              onPress={() => {
                this.props.navigation.navigate('AnimalColourChangeScreen', {
                  id: this.state.animal.id,
                  colour: this.state.animal.colour,               
                });
              }}
            />
            <List.Item
              title="Estado"
              description={this.state.animal.status}
              onPress={() => {
                this.props.navigation.navigate('AnimalStatusChangeScreen', {
                  id: this.state.animal.id,
                  status: this.state.animal.status,
                });
              }}
            />
            <List.Item
              title="Tamaño"
              description={this.state.animal.size}
              onPress={() => {
                this.props.navigation.navigate('AnimalSizeChangeScreen', {
                  id: this.state.animal.id,
                  size: this.state.animal.size,
                });
              }}
            />
            <List.Item
              title="Ciudad"
              description={this.state.animal.city/*this.props.route.params.animal.city*/}
              onPress={() => {
                this.props.navigation.navigate('AnimalCityChangeScreen', {
                  id: this.state.animal.id,
                  city: this.state.animal.city,
                  /*id: this.props.route.params.animal.id,
                  city: this.props.route.params.animal.city,*/
                });
              }}
            />
            <List.Item
              title="Tipo"
              description={this.state.animal.type/*this.props.route.params.animal.type*/}
              onPress={() => {
                this.props.navigation.navigate('AnimalTypeChangeScreen', {
                  id: this.state.animal.id,
                  type: this.state.animal.type,
                  /*id: this.props.route.params.animal.id,
                  type: this.props.route.params.animal.type,*/
                });
              }}
            />
          </View>
        </ScrollView>
      </>
    );
  }
}

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
    flex: 1,
    marginLeft: 25,
  },
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  title: {
    marginVertical: 15,
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
