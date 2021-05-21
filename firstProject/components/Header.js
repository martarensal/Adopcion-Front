import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default class Header extends React.Component {
  render() {
    return <Text style={styles.header}>{this.props.children}</Text>;
  }
}

const styles = StyleSheet.create({
  header: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 26,
    color: '#15abe7',
    paddingVertical: 14,
  },
});