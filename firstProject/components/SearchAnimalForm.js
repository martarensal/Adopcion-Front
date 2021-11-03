import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

export default class SearchAnimalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sex: '',
      minAge: '',
      maxAge: '',
      colour: '',
      animalSize:'',
      idCity:'',
    };
  }

  render() {
    return (
      <View style={styles.container} behavior="padding">
        <Text style={styles.text}>Sexo</Text>
        <TextInput
          mode="outlined"
          onChangeText={value => this.setState({sex: value})}
        />
        
        <Button
          style={styles.button}
          mode="contained"
          dark={true}
          onPress={() => this.props.handlePress(this.state)}>
          Buscar
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
  text: {
    fontFamily: 'OpenSans-Bold',
    color: '#69e000',
    fontSize: 18,
    marginTop: 5,
  },
  button: {
    marginTop: 20,
  },
});