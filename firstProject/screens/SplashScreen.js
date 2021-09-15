import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          alignSelf: 'stretch',
        }}>
        <View style={{justifyContent: 'center', marginTop: 200}}>
          <Text style={styles.primaryText}>
            Save
            <Text style={styles.secondaryText}>Pet</Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  primaryText: {
    fontFamily: 'Butler_Light',
    color: '#DEB74E',
    fontSize: 70,
  },
  secondaryText: {
    color: '#80E094',
  },
});