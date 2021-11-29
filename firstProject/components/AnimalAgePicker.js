import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
var SecurityUtils = require('../utils/SecurityUtils.js');
var validate = require('validate.js');
export default class AnimalAgePicker extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.text}>
            {'Mínima: ' + [this.props.minAge]+ '  Máxima: '+[ this.props.maxAge]}
          </Text>
        <MultiSlider 
          values={[this.props.minAge,this.props.maxAge]}
          sliderLength={300}
          onValuesChange={(values) => {this.props.onChange(values[0], values[1])}}
          min={0}
          max={30}
          //step={1}
        />
      </View>
      );
  }
}

const styles = StyleSheet.create({
  text: {
    justifyContent: 'space-between',
  },
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  }

});