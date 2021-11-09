import React, {Component} from 'react';
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
import AnimalColourPicker from '../components/AnimalColourPicker.js';
import AnimalSizePicker from '../components/AnimalSizePicker.js';
import AnimalTypePicker from '../components/AnimalTypePicker.js';
import FinalStep from '../components/FinalStep.js';
import AnimalAgePicker from '../components/AnimalAgePicker.js';

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

export default class SearchAnimalScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minAge: '',
      maxAge: '',
      sex: '',
      type:'',

      activeSections: [],
      collapsed: true,
      multipleSelect: false,
    };

    this.searchAnimals = this.searchAnimals.bind(this);
    this.CONTENT = [
      {
        title: 'Ciudad',
        content: <FinalStep onChange={city => this.setState({filterCity: city})} />,
      },
      {
        title: 'Tipo de animal',
        content: <AnimalTypePicker onChange={/*type => {this.setState({filterType: type})
        console.log(this.state.filterType + ' filtertype')}*/
        this.searchAnimals
        } />,
      },
      {
        title: 'Tamaño',
        content: <AnimalSizePicker onChange={size => this.setState({filterSize: size})} />,
      },
      {
        title: 'Sexo',
        content: 
          <AnimalSexPicker onChange={this.searchAnimals} />
        ,
      },
      {
        title: 'Color',
        content: <AnimalColourPicker onChange={colour => this.setState({filterColour: colour})}/>,
      },
      {
        title: 'Edad',
        content: <AnimalAgePicker handlePress={this.searchAnimals} />,
      },
    ];
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
  componentDidMount(){
    console.log(this.state)
  }

  async searchAnimals(searchParameters) {
    this.setState({
     minAge: searchParameters.minAge,
      maxAge: searchParameters.maxAge,
    });
    this.setState({sex: searchParameters.sex})
    this.setState({type: searchParameters.type})
    console.log(searchParameters.type + '  type')
    console.log(searchParameters.sex + ' sexo');


  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{paddingTop: 30}}>
          <Text style={styles.title}>Accordion Example</Text>

          <View style={styles.multipleToggle}>
            <Text style={styles.multipleToggle__title}>
              ¿Quieres elegir mas de un filtro a la vez?
            </Text>
            <Switch
              value={this.state.multipleSelect}
              onValueChange={a => this.setState({multipleSelect: a})}
            />
          </View>
          <View style={styles.selectors}>
            {SELECTORS.map(selector => (
              <TouchableOpacity
                key={selector.title}
                onPress={() => this.setSections([selector.value])}>
                <View style={styles.selector}>
                  <Text
                    style={
                      this.state.activeSections.includes(selector.value) &&
                      styles.activeSelector
                    }>
                    {selector.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Accordion
            activeSections={this.state.activeSections}
            sections={this.CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={this.state.multipleSelect}
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
    height: 300,
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
