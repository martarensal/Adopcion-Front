import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default class ErrorText extends React.Component {
  render() {
    return <Text style={styles.errorText}>{this.props.children}</Text>;
  }
}

const styles = StyleSheet.create({
  errorText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    color: '#D61E1E',
    paddingVertical: 14,
    marginLeft: 14,
  },
});