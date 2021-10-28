import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import SearchAnimalForm from '../components/SearchAnimalForm';
import {getUser} from '../client/UsersApi';
import {searchAnimals} from '../client/AnimalApi';
var SecurityUtils = require('../utils/SecurityUtils');

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
    };
    this.fetchUserData = this.fetchUserData.bind(this);
    this.searchAnimals = this.searchAnimals.bind(this);
  }

  handleSearchAnimalResponse(response) {
    if (response.ok) {
      response.json().then(data => {
        this.props.navigation.navigate('SearchedAnimalScreen', {
          animals: data.pages,
          paginationInfo: data.paginationInfo,
          sex: this.state.sex,
          animalSize: this.state.animalSize,
          colour: this.state.colour,
          minAge: this.state.minAge,
          maxAge: this.state.maxAge,
          idCity: this.state.idCity,

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
    });
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi(
        [searchParameters.animalSize,
            searchParameters.colour,
            searchParameters.minAge,
            searchParameters.maxAge,
            searchParameters.idCity,
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
});