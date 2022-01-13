import React, { Fragment } from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';
var SecurityUtils = require('../utils/SecurityUtils.js');
import SearchableDropdown from 'react-native-searchable-dropdown';

export default class DropdownForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      item: [],
      textItem: '',
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(event, newItem) {
    if (newItem !== undefined) {
      this.setState({
        show: false,
        item: newItem,
        textItem: newItem
      });
      this.props.onChange(newITem);
    } else this.setState({show: false});
  }

  render() {
      /*return (
        <SearchableDropdown 
        onItemSelect={(sex) => {
          console.log(sex)
        this.setState({ sex: sex });
        console.log(this.state.sex)
        }}
        mode="outlined"
        underlineColor="transparent"
        itemStyle={{
        padding: 10,
        marginTop: 2,
        borderWidth: 1,
        borderRadius: 5,
      
        }}
        items={sexOption}
        defaultIndex={2}
        resetValue={false}
        textInputProps={
        {
            placeholder: "Sexo",
            value: this.state.sex.name,
            underlineColorAndroid: "transparent",
            style: {
                padding: 12,
                borderWidth: 1,
                borderRadius: 5,
                marginTop: 5,
            },
        }
        }
        listProps={
        {
            nestedScrollEnabled: true,
        }
        }
    />
      )*/
    return (
      <View>
        <TextInput
          caretHidden={true}
          onFocus={() => {
            this.setState({show: true});
            Keyboard.dismiss();
          }}
          label={this.props.label}
          mode="outlined"
          value={this.state.textDate}
        />
        {this.state.show && (
          <DateTimePicker
            mode="time"
            testID="dateTimePicker"
            value={this.state.date}
            display="default"
            onChange={this.setDate}
          />
        )}
      </View>
    );
  }
}