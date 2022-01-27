import React from 'react';
import {Appbar} from 'react-native-paper';
import {StyleSheet, View, Text, Image} from 'react-native';
import AnimalCreationForm from '../components/AnimalCreationForm';
import {addAnimal} from '../client/AnimalApi';
import {DrawerActions} from '@react-navigation/native';
var SecurityUtils = require('../utils/SecurityUtils');
import {ScrollView} from 'react-native-gesture-handler';
import LoadingIndicator from '../components/LoadingIndicator';
import {getTypes} from '../client/TypeApi';
import {
  getAC,
  getProvincesFromAC,
  getCityFromProvince,
} from '../client/CityApi';

export default class CreateAnimalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrorVisible: false,
      loadingData: false,
      loadingDataType: false,
      loadingDataCommunity: false,
      autonomousCommunity: undefined,
      provinces: [],
      cities: [],
      animalTypes: [],
      image:'',
    };

    this.onChangeAnimalField = this.onChangeAnimalField.bind(this);
    this.addAnimalCall = this.addAnimalCall.bind(this);
    this.handleCreateNewAnimalResponse =
      this.handleCreateNewAnimalResponse.bind(this);
  }

  componentDidMount() {
    this.getAnimalTypeFromAPI();
    this.getACCall();
  }

  async handleGetAnimalTypeResponse(response) {
    console.log(response);
    var types = [];
    const jsonResponse = await response.json();
    this.setState({
      animalTypes: jsonResponse.pages,
      loadingData: false,
    });
  }

  getAnimalTypeFromAPI() {
    SecurityUtils.authorizeApi([], getTypes).then(
      this.handleGetAnimalTypeResponse.bind(this),
    );
  }

  async handleGetACResponse(response) {
    var ACs = [];
    const jsonResponse = await response.json();
    this.setState({
      autonomousCommunities: jsonResponse.pages,
      loadingDataCommunity: false,
    });
  }

  async handleGetCityResponse(response) {
    var cities = [];
    const jsonResponse = await response.json();
    this.setState({cities: jsonResponse.pages});
  }

  async handleGetProvincefromAC(response) {
    var provinces = [];
    const jsonResponse = await response.json();
    this.setState({provinces: jsonResponse.pages});
  }

  getACCall() {
    SecurityUtils.authorizeApi([], getAC).then(
      this.handleGetACResponse.bind(this),
    );
  }

  getProvincesFromAC = () => {
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [this.state.autonomousCommunity],
        getProvincesFromAC,
      ).then(this.handleGetProvincefromAC.bind(this));
    });
  };

  getCityFromProvince = () => {
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [this.state.province],
        getCityFromProvince,
      ).then(this.handleGetCityResponse.bind(this));
    });
  };

  onChangeAnimalField(field, value) {
    this.setState(
      {
        [field]: value,
      },
      () => console.log(this.state),
    );
  }

  handleCreateNewAnimalResponse(response) {
    if (response.ok) {
      console.log(JSON.stringify(response));
      console.log('Animal creado');
    } else {
      console.log(JSON.stringify(response));
      this.setState({isErrorVisible: true});
    }
  }

  addAnimalCall(name, sex, age, colour, size, city, idType, image) {
    let body = {
      age: age,
      city_id: city,
      colour: colour,
      image: image,
      name: name,
      sex: sex,
      size: size,
      status: 'homeless',
      type_id: idType,
    };
    console.log(JSON.stringify(body, null, 2));
    SecurityUtils.authorizeApi(
      [body, this.props.route.params.username],
      addAnimal,
    ).then(this.handleCreateNewAnimalResponse.bind(this));
  }

  render() {
    if (this.state.loadingDataType && this.state.loadingDataCommunity)
      return (
        <View style={styles.container}>
          <LoadingIndicator />
        </View>
      );

    return (
      <>
        <View style={styles.background}>
          <Appbar style={styles.barra}>
            <Appbar.Action
              icon="menu"
              onPress={() => {
                this.props.navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            />
            <Text style={styles.logo}>SavePet</Text>
          </Appbar>

          <View style={styles.container} behavior="padding">
            <Text style={styles.text}>Nuevo animal</Text>
            <AnimalCreationForm
              username={this.props.route.params.username}
              onCreate={() => this.props.navigation.navigate('Mis animales')}
              age={this.state.age}
              name={this.state.name}
              size={this.state.size}
              colour={this.state.colour}
              sex={this.state.sex}
              image={this.state.image}
              idType={this.state.type}
              types={this.state.animalTypes}
              type={this.state.type}
              city={this.state.city}
              cities={this.state.cities}
              province={this.state.province}
              provinces={this.state.provinces}
              autonomousCommunity={this.state.autonomousCommunity}
              autonomousCommunities={this.state.autonomousCommunities}
              getCityFromProvince={this.getCityFromProvince}
              getProvincesFromAC={this.getProvincesFromAC}
              onChangeAnimalField={this.onChangeAnimalField}
              onFinish={this.addAnimalCall}
            />
          </View>
        </View>
      </>
    );
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
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    marginBottom: 15,
    marginTop: 20,
    textAlign: 'center',
  },
});
