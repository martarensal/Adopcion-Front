import React from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {List, Divider, Card, Button, Title, Paragraph } from 'react-native-paper';
import {Appbar} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import HeaderAppbar from '../components/HeaderAppbar';

export default class AnimalDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: 'data:image/png;base64,',
    };
  }

  render() {
    return (
      <>
        <HeaderAppbar />

        <Card key={this.props.route.params.animal.id}>
          <Card.Cover
            style={styles.image}
            source={{
              uri: this.state.base64 + this.props.route.params.animal.image,
            }}
          />
          <Card.Content>
            <View style={styles.textContent}>
              <Title style={styles.textStyle}>
                {this.props.route.params.animal.name}
              </Title>
              <Paragraph style={styles.textStyle}>
                Estado del animal: {this.props.route.params.animal.status}
              </Paragraph>
              <Paragraph style={styles.textStyle}>
                Ciudad: {this.props.route.params.animal.city}
              </Paragraph>
              <Paragraph style={styles.textStyle}>
                Ciudad: {this.props.route.params.animal.age}
              </Paragraph>
              <Paragraph style={styles.textStyle}>
                Ciudad: {this.props.route.params.animal.size}
              </Paragraph>
              <Paragraph style={styles.textStyle}>
                Ciudad: {this.props.route.params.animal.colour}
              </Paragraph>
            </View>
          </Card.Content>
          <Card.Actions style={styles.button}>
            <Button
              style={styles.button}
              dark={true}
              mode="contained"
              color="#F5C401"
              onPress={() => {
                this.props.navigation.navigate('EmailScreen', {
                  user: this.props.route.params.animal.user,
                  animal: this.props.route.params.animal,
                });
              }}>
              Solicitar
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height:300,
  },
  textContent: {
    marginLeft: 15,
  },
  
  container: {
    flex: 1,
    width: '100%',
    //alignSelf: 'center',
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  button: {
    width: '100%',
  },
 
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
  },
});
