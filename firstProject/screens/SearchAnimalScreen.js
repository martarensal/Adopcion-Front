
/*
export default class SearchAnimalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      sex: '',
      minAge: '',
      maxAge: '',
      colour: '',
      animalSize:'',
      idCity:'',
      idType:'',
    };
    this.fetchUserData = this.fetchUserData.bind(this);
    this.searchAnimals = this.searchAnimals.bind(this);
  }

  handleSearchAnimalResponse(response) {
    if (response.ok) {
      response.json().then(data => {
        this.props.navigation.navigate('', {
          animals: data.pages,
          paginationInfo: data.paginationInfo,
          sex: this.state.sex,
          animalSize: this.state.animalSize,
          colour: this.state.colour,
          minAge: this.state.minAge,
          maxAge: this.state.maxAge,
          idCity: this.state.idCity,
          idType: this.state.idType,

        });
      });
    } else {
      console.log(JSON.stringify(response));
    }
  }

  searchAnimals(searchParameters) {
    this.setState({
      sex: searchParameters.sex,
      animalSize: searchParameters.animalSize,
      colour: searchParameters.colour,
      minAge: searchParameters.minAge,
      maxAge: searchParameters.maxAge,
      idCity: searchParameters.idCity,
      idType: searchParameters.idType
    });
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [searchParameters.animalSize,
            searchParameters.colour,
            searchParameters.minAge,
            searchParameters.maxAge,
            searchParameters.idCity,
            searchParameters.idType,
           0,
           5,
        ],
        searchAnimals,
      ).then(this.handleSearchAnimalResponse.bind(this));
    });
  }

  handleGetUserResponse(response) {
    response.json().then(data => {
      this.setState({user: data});
    });
  }

  fetchUserData() {
    this.setState({loading: true});
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi([info.sub], getUser).then(
        this.handleGetUserResponse.bind(this),
      );
    });
  }

  render() {
    return (
      <View style={styles.container} behavior="padding">
        <SearchAnimalForm handlePress={this.searchAnimals} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
  },
  image: {
    width: 100,
    height: 100,
  },
});*/
/*import React from 'react';

import  { Text, View, Component,StyleSheet } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

export default class SearchAnimalScreen extends React.Component {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = (section) => {
    return (
      <View >
        <Text>{section.content}</Text>
      </View>
    );
  };

  _renderHeader = (section) => {
    return (
      <View >
        <Text>{section.title}</Text>
      </View>
    );
  };

  _renderContent = (section) => {
    return (
      <View >
        <Text>{section.content}</Text>
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        activeSections={this.state.activeSections}
        renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}
*/
import React, { Component } from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import AnimalSexPicker from '../components/AnimalSexPicker.js';


const BACON_IPSUM =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

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
  }
];
 const CONTENT = [
  {
    title: 'Ciudad',
    content: BACON_IPSUM,
  },
  {
    title: 'Tipo de animal',
    content: BACON_IPSUM,
  },
  {
    title: 'Tamaño',
    content: BACON_IPSUM,
  },
  {
    title: 'Sexo',
    content: <AnimalSexPicker/>,
  },
  {
    title: 'Color',
    content: BACON_IPSUM,
  },
   {
    title: 'Edad',
    content: BACON_IPSUM,
  },
  ];

export default class SearchAnimalScreen extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
    //console.log('EY')
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };
componentDidMount(){
  console.log(SELECTORS.map((selector) => (selector.value)))
}
  renderContent(section, _, isActive) {
    return (
      if(SELECTORS.map((selector) => (selector.value)) === 0){
        
      }
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
        
      >
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
        </Animatable.Text>
        <AnimalSexPicker/>

      </Animatable.View>
    );
  }

  render() {
 
    const { multipleSelect, activeSections } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
          <Text style={styles.title}>Accordion Example</Text>

          <View style={styles.multipleToggle}>
              <Text style={styles.multipleToggle__title}>¿Quieres elegir mas de un filtro a la vez?</Text>
            <Switch
              value={multipleSelect}
              onValueChange={(a) => this.setState({ multipleSelect: a })}
            />
          </View>       
          <View style={styles.selectors}>
            {SELECTORS.map((selector) => (
              <TouchableOpacity
                key={selector.title}
                onPress={() => this.setSections([selector.value])}
              >
                <View style={styles.selector}>
                  <Text
                    style={
                      activeSections.includes(selector.value) &&
                      styles.activeSelector
                    }
                  >
                    {selector.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
            renderAsFlatList={false}
          />
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
    height:300,
    width:430,
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
  multipleToggle__select:{
        fontSize: 16,
    marginRight: 8,
       
  },
});