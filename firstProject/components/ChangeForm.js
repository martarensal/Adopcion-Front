import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

export default class ChangeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newValue: '',
    };
  }

  render() {
    let actualValue = this.props.value.toString();
    return (
      <>
        <TextInput label="Actual" value={actualValue} disabled={true} />
        <TextInput
          label="Introduzca aqui el nuevo valor"
          value={this.state.newValue}
          onChangeText={value => this.setState({newValue: value})}
        />
        <View style={styles.buttonContainer}>
          <Button
            color="#ABE009"
            mode="contained"
            disabled={!this.state.newValue}
            dark={true}
            onPress={() => this.props.handlePress(this.state)}>
            Enviar
          </Button>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
