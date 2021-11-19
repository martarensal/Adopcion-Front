import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');
export default class AnimalAgePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minAge: '',
      maxAge: '',

    };
  }
  /*

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
  }*/
 
  render() {
    return (
      <ScrollView scrollEnabled={true}>
        <MultiSlider 
          values={[this.props.minAge,this.props.maxAge]}
          sliderLength={250}
          onValuesChange={(values) => {this.props.onChange(values[0], values[1])}}
          min={0}
          max={30}
          step={1}
        />
      </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },

});