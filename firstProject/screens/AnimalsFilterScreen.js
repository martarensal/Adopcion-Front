import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Appbar, FAB, Card, Button, Title, Paragraph } from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
import {ScrollView} from 'react-native-gesture-handler';
import {DrawerActions} from '@react-navigation/native';
import HeaderAppbar from '../components/HeaderAppbar';
import {searchAnimals} from '../client/AnimalApi';

var SecurityUtils = require('../utils/SecurityUtils');

export default class AnimalsFilterScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animals: [],
      paginationInfo: {},
      loading: true,
      page: 0,
      base64: 'data:image/png;base64,',
      width: 80,
      height: 80,
    };
    this.callSearchAnimals = this.callSearchAnimals.bind(this);
  }

  callSearchAnimals() {
    if (this.state.page === 0) this.setState({loading: true});
    let idCity = this.props.route.params.dataFilters.idCity;
    let idType = this.props.route.params.dataFilters.idType;
    let animalSize = this.props.route.params.dataFilters.animalSize;
    let sex = this.props.route.params.dataFilters.sex;
    let colour = this.props.route.params.dataFilters.colour;
    let minAge = this.props.route.params.dataFilters.minAge;
    let maxAge = this.props.route.params.dataFilters.maxAge;
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [animalSize, sex, colour, minAge, maxAge, idCity, idType, this.state.page, 6],
        searchAnimals,
      ).then(this.handleSearchAnimalsResponse.bind(this));
    });
  }

  showMoreAnimals() {
    this.setState({page: this.state.page + 1}, () => this.callSearchAnimals());
  }

  handleSearchAnimalsResponse(response) {
    response.json().then(data =>
      this.setState({
        animals: this.state.animals.concat(data.pages),
        paginationInfo: data.paginationInfo,
        loading: false,
      }),

    );
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      'focus',
      this.callSearchAnimals.bind(this),
    );
    this._outOfFocus = this.props.navigation.addListener('blur', () =>
      this.setState({animals: [], page: 0}),
    );
    console.log(this.state.page)
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
          <ScrollView style={styles.background}>
            <View style={styles.container}>
              <Text style={styles.title}>Animales disponibles</Text>
              {this.state.animals[0] === undefined ? (
                <>
                  <View style={styles.container}>
                    <Text style={styles.label}>
                      Ningún animal cumple con esas características
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('NewSearchAnimalScreen')
                      }>
                      <Text style={styles.link}>
                        ¿Quieres probar con otros filtros?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                this.state.animals.map(animal => {
                  return (
                    <Card key={animal.id} >
                      <Card.Cover style={styles.image} source={{ uri: this.state.base64 + animal.image }} />
                       <Card.Content>     
                         <View style={styles.textContent}>               
                       <Title style={styles.textStyle}>{animal.name}</Title>
                        <Paragraph style={styles.textStyle}>Ciudad: {animal.city}</Paragraph>
                        <Paragraph style={styles.textStyle}>Especie: {animal.type}</Paragraph>
                        </View>
                        </Card.Content> 
                        <Card.Actions style={styles.button}>
                        <Button
                          color="#E67E00"
                          onPress={() =>
                            this.props.navigation.navigate(
                              'AnimalDetailScreen',
                              {
                                animal: animal,
                              },
                            )
                          }>
                          Ver detalles
                        </Button>
                      </Card.Actions>
                     
                      </Card>
                  );
                })
              )}
              {this.state.page !== this.state.paginationInfo.totalPages - 1 &&
              this.state.paginationInfo.totalElements !== 0 ? (
                <Button
                  color="#F05524"
                  onPress={this.showMoreAnimals.bind(this)}>
                  VER MÁS
                </Button>
              ) : undefined}
            </View>
          </ScrollView>
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  image: {
    height:300,
  },
  textContent: {
    marginLeft: 15,
  },
  textStyle: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  title: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    marginBottom: 15,
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    color: '#E67E00',
    justifyContent: 'flex-end',
  },
});
