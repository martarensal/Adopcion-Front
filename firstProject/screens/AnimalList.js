import React, {Component} from 'react';
import {List} from 'react-native-paper';
import {getUser, getAnimalsFromUser} from '../client/UsersApi';
var SecurityUtils = require('../utils/SecurityUtils');
export default class AnimalList extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            animals:{},
            users:{}
        }
        this.setAnimal = this.setAnimal.bind(this)
    }

    handleGetAnimalsResponse(response) {
    response.json().then(data => this.setState({animals: data}));
    }

  handleGetUserResponse(response) {
    response.json().then(data => {
      this.setState({user: data});
      SecurityUtils.authorizeApi([data.username], getAnimalsFromUser).then(
        this.handleGetAnimalsResponse.bind(this),
      );
    });
  }

  fetchUserDataWithAnimals() {
    SecurityUtils.tokenInfo().then(info => {
      SecurityUtils.authorizeApi([info.sub], getUser).then(
        this.handleGetUserResponse.bind(this),
      );
    });
  }

  componentDidMount() {
    this.fetchUserDataWithAnimals();
  }

  setAnimal(animal) {
    this.props.handlePress(animal);
  }

    render()
    { 
        return(
        <>
      
        {this.state.animals[0] !== undefined
          ? this.state.animals.map(animal => {
              return (
                <List.Item
                  key={animal.id}
                  title={animal.name + ' ' + animal.age}
                  description={animal.sex, animal.status}
                  //left={props => <List.Icon {...props} icon="car" />}
                  onPress={() => {
                    this.setAnimal(animal);
                  }}
                />
              );
            })
          : undefined}
      </>
    );
    }
}