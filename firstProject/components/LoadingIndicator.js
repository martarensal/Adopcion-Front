import * as React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

export default class LoadingIndicator extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color="#A7E009" size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});