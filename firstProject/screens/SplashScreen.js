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
    fontFamily: 'Pacifico-Regular',
    color: '#15abe7',
    fontSize: 70,
  },
  secondaryText: {
    color: '#69e000',
  },
});