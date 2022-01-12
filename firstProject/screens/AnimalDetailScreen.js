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
import {List, Divider, Button} from 'react-native-paper';
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
        <View style={styles.background}>
          <View style={styles.container}>
           
            <Text style={styles.title}> Información del animal</Text>
            <View style={styles.layout}>
             
               <Image
                style={styles.image}
                source={{
                  uri: this.state.base64 + this.props.route.params.animal.image,
                }}
              />
              <View style={styles.text}>
                <Text style={styles.text}> Nombre {this.props.route.params.animal.name}</Text>
                <Text style={styles.text}>
                  {' '}
                  Estado actual {this.props.route.params.animal.status}
                </Text>
                <Text style={styles.text}> Ciudad {this.props.route.params.animal.city}</Text>
                <Text style={styles.text}> Edad {this.props.route.params.animal.age}</Text>
                <Text style={styles.text}> Color {this.props.route.params.animal.colour}</Text>
                <Text style={styles.text}> Tamaño {this.props.route.params.animal.size}</Text>
              </View>
            </View>
          </View>
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
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    textAlign: 'left',
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
  text: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
    marginVertical: 5,
    marginLeft: 20,
  },
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  title: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    marginVertical: 15,
    textAlign: 'center',
  },
});
