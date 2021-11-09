import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');

export default class AnimalColourPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minAge: '',
      maxAge: '',
    };
    this.render = this.render.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Edad mínima</Text>
        <TextInput
          mode="outlined"
          onChangeText={value => this.setState({minAge: value})}
        />
        <Text style={styles.text}>Edad máxima</Text>
        <TextInput
          mode="outlined"
          onChangeText={value => this.setState({maxAge: value})}
        />
        <Button
          style={styles.button}
          mode="contained"
          dark={true}
          onPress={() => this.props.handlePress(this.state)}>
          Ok
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },

  /*text: {
    fontFamily: 'OpenSans-Bold',
    color: '#F05524',
    fontSize: 15,
    marginTop: 5,
    paddingLeft:10,
  },*/
  button: {
    width: 40,
    height: 40,
    marginTop: 24,
  },
});
