import React from 'react';
import {Appbar} from 'react-native-paper';
import {Text, StyleSheet} from 'react-native';

export default class HeaderAppbar extends React.Component {
  render() {
    return (
      <>
        <Appbar style={styles.barra}>
          <Text style={styles.logo}>SavePet</Text>
        </Appbar>
      </>
    );
  }
}

const styles = StyleSheet.create({
  barra: {
    backgroundColor: '#E67E00',
  },
  logo: {
    fontFamily: 'Butler_Light',
    color: 'white',
    fontSize: 25,
    marginLeft: 14,
    alignSelf: 'center',
  },
});
