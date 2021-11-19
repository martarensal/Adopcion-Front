import React, {Component} from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import AnimalSexPicker from '../components/AnimalSexPicker.js';
import AnimalColourPicker from '../components/AnimalColourPicker.js';
import AnimalSizePicker from '../components/AnimalSizePicker.js';
import AnimalTypePicker from '../components/AnimalTypePicker.js';
import AnimalCityPicker from '../components/AnimalCityPicker.js';
import FinalStep from '../components/FinalStep.js';
import AnimalAgePicker from '../components/AnimalAgePicker.js';
import {searchAnimals} from '../client/AnimalApi';
import {getTypes} from '../client/TypeApi';
import {
  getAC,
  getProvincesFromAC,
  getCityFromProvince,
} from '../client/CityApi';

import LoadingIndicator from '../components/LoadingIndicator';

var SecurityUtils = require('../utils/SecurityUtils');

const SELECTORS = [
  {
    title: 'Ciudad',
    value: 0,
  },
  {
    title: 'Tipo de animal',
    value: 1,
  },
  {
    title: 'Tamaño',
    value: 2,
  },
  {
    title: 'Sexo',
    value: 3,
  },
  {
    title: 'Color',
    value: 4,
  },
  {
    title: 'Edad',
    value: 5,
  },
];

const MultipleFiltersComponent = props => (
  <View style={styles.multipleToggle}>
    <Text style={styles.multipleToggle__title}>
      ¿Quieres elegir mas de un filtro a la vez?
    </Text>
    <Switch
      value={props.value}
      onValueChange={newValue => props.onValueChange(newValue)}
    />
  </View>
);

const FilterHeaderComponent = props => (
  <View style={styles.selectors}>
    {props.selectors.map(selector => (
      <TouchableOpacity
        key={selector.title}
        onPress={() => props.setSections([selector.value])}>
        <View style={styles.selector}>
          <Text
            style={
              props.activeSections.includes(selector.value) &&
              styles.activeSelector
            }>
            {selector.title}
          </Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

export default class NewSearchAnimalScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSections: [],
      collapsed: true,
      loadingDataType: true,
      idType: undefined,
      animalSize: undefined,
      sex: undefined,
      colour: undefined,
      minAge: 0,
      maxAge: 30,
      idCity: undefined,
      loadingDataCommunity: true,
      autonomousCommunity: undefined,
    };

    this.setSections = this.setSections.bind(this);
    this.callSearchAnimals = this.callSearchAnimals.bind(this);
  }
  //TYPE
  async handleGetAnimalTypeResponse(response) {
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
  //END TYPE

  //CITY

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

  async handlegetProvincefromAC(response) {
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
      ).then(this.handlegetProvincefromAC.bind(this));
    });
  }

  getCityFromProvince = () => {
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [this.state.province],
        getCityFromProvince,
      ).then(this.handleGetCityResponse.bind(this));
    });
  }
  //END CITY

  componentDidMount() {
    this.getAnimalTypeFromAPI();
    this.getACCall();
  }

  setSections = sections => {
    //console.log(sections);
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Animatable.View animation={isActive ? 'bounceIn' : undefined}>
          {section.content}
        </Animatable.View>
      </Animatable.View>
    );
  }

  callSearchAnimals() {
    let idCity = this.state.idCity;
    let idType = this.state.idType;
    let animalSize = this.state.animalSize;
    let sex = this.state.sex;
    let colour = this.state.colour;
    let minAge = this.state.minAge;
    let maxAge = this.state.maxAge;
    let page = 0;
    let size = 25;

    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [animalSize, sex, colour, minAge, maxAge, idCity, idType, page, size],
        searchAnimals,
      )
        .then(res => res.json())
        .then(this.handleSearchAnimalsResponse.bind(this));
    });
  }

  handleSearchAnimalsResponse(response) {
    console.log(response);
  }

  render() {
    let filterComponents = [
      {
        title: 'Ciudad',
        content: (
          <AnimalCityPicker
            autonomousCommunity = {this.state.autonomousCommunity}
            autonomousCommunities = {this.state.autonomousCommunities}
            province = {this.state.province}
            provinces = {this.state.provinces}
            city = {this.state.idCity}
            cities = {this.state.cities}
            onChange={(autonomousCommunity, province, idCity) => {
              this.setState({autonomousCommunity: autonomousCommunity, province: province,idCity: idCity});
            }}
          />
        ),
      },
      {
        title: 'Tipo de animal',
        content: (
          <AnimalTypePicker
            type={this.state.idType}
            types={this.state.animalTypes}
            onChange={type => {
              this.setState({idType: type});
            }}
          />
        ),
      },
      {
        title: 'Tamaño',
        content: (
          <AnimalSizePicker
            animalSize={this.state.animalSize}
            onChange={animalSize => this.setState({animalSize: animalSize})}
          />
        ),
      },
      {
        title: 'Sexo',
        content: (
          <AnimalSexPicker
            sex={this.state.sex}
            onChange={sex => this.setState({sex: sex})}
          />
        ),
      },
      {
        title: 'Color',
        content: (
          <AnimalColourPicker
            colour={this.state.colour}
            onChange={colour => this.setState({colour: colour})}
          />
        ),
      },
      {
        title: 'Edad',
        content: (
          <AnimalAgePicker
            minAge={this.state.minAge}
            maxAge={this.state.maxAge}
            onChange={(minAge, maxAge) => {
              this.setState({minAge: minAge, maxAge: maxAge});
            }}
          />
        ),
      },
    ];

    console.log(JSON.stringify(this.state, null, 4));
    if (this.state.loadingDataType && this.state.loadingDataCommunity )
      return (
        <View style={styles.container}>
          <LoadingIndicator />
        </View>
      );
    else
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{paddingTop: 30}}>
            <Text style={styles.title}>Accordion Example</Text>

            <FilterHeaderComponent
              selectors={SELECTORS}
              setSections={this.setSections}
              activeSections={this.state.activeSections}
            />
            <Accordion
              activeSections={this.state.activeSections}
              sections={filterComponents}
              touchableComponent={TouchableOpacity}
              expandMultiple={true}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={400}
              onChange={this.setSections}
              renderAsFlatList={false}
            />
            <Button
              style={styles.button}
              mode="contained"
              dark={true}
              onPress={this.callSearchAnimals}>
              Filter
            </Button>
          </ScrollView>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    //padding: 20,
    height: 100,
    width: 430,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  multipleToggle__select: {
    fontSize: 16,
    marginRight: 8,
  },
});