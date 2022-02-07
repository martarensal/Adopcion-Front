import React, {Component} from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Button, Appbar} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import AnimalSexPicker from '../components/AnimalSexPicker.js';
import AnimalColourPicker from '../components/AnimalColourPicker.js';
import AnimalSizePicker from '../components/AnimalSizePicker.js';
import AnimalTypePicker from '../components/AnimalTypePicker.js';
import AnimalCityPicker from '../components/AnimalCityPicker.js';
import AnimalAgePicker from '../components/AnimalAgePicker.js';
import {DrawerActions} from '@react-navigation/native';
import {getTypes} from '../client/TypeApi';
import {
  getAC,
  getProvincesFromAC,
  getCityFromProvince,
} from '../client/CityApi';

import LoadingIndicator from '../components/LoadingIndicator';
import HeaderAppbar from '../components/HeaderAppbar';

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
      provinces: [],
      cities: [],
      types: [],
      animalTypes: [],
    };

    this.setSections = this.setSections.bind(this);
  }
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
  componentDidMount() {
    this.getAnimalTypeFromAPI();
    this.getACCall();
  }

  setSections = sections => {
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

  render() {
    let filterComponents = [
      {
        title: 'Ciudad',
        content: (
          <AnimalCityPicker
            autonomousCommunity={this.state.autonomousCommunity}
            autonomousCommunities={this.state.autonomousCommunities}
            province={this.state.province}
            provinces={this.state.provinces}
            city={this.state.idCity}
            cities={this.state.cities}
            onAutonomousCommunityChange={autonomousCommunity => {
              this.setState({autonomousCommunity: autonomousCommunity});
              this.getProvincesFromAC();
            }}
            onProvinceChange={province => {
              this.setState({province: province});
              this.getCityFromProvince();
            }}
            onCityChange={city => {
              this.setState({idCity: city});
              console.log(city);
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

    if (this.state.loadingDataType && this.state.loadingDataCommunity)
      return (
        <View style={styles.container}>
          <LoadingIndicator />
        </View>
      );
    else
      return (
        <>
          <HeaderAppbar />
          <View style={styles.container}>
            <ScrollView contentContainerStyle={{paddingTop: 30}}>
              <Text style={styles.title}>Filtros</Text>

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
                dark={true}
                mode="contained"
                color="#F5C401"
                onPress={() => {
                  this.props.navigation.navigate('AnimalsFilterScreen', {
                    dataFilters: {
                      idCity: this.state.idCity,
                      idType: this.state.idType,
                      animalSize: this.state.animalSize,
                      sex: this.state.sex,
                      colour: this.state.colour,
                      minAge: this.state.minAge,
                      maxAge: this.state.maxAge,
                      page: 0,
                      size: 5,
                    },
                  });
                }}>
                Buscar
              </Button>
            </ScrollView>
          </View>
        </>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  background: {
    flex: 1,
  },
  button: {
    justifyContent: 'flex-end',
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
  title: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    marginVertical: 15,
    textAlign: 'center',
  },
  header: {
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },

  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: 'RobotoSlab-Regular',
  },
  selector: {
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
