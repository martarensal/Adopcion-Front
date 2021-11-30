import React from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Alert
} from 'react-native';
import {List, Divider,Button} from 'react-native-paper';
import {Appbar} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';

export default class AnimalDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: 'data:image/png;base64,',
      width: 150,
      height: 150,
    };
  }
  /*componentDidMount(){
    Image.getSize(this.state.base64 + this.props.route.params.animal.image, (width, height) => {
      screen_percentage = 0.55
      this.setState({
        width: ((Dimensions.get("screen").width*screen_percentage/width)*width),
        height: ((Dimensions.get("screen").height*screen_percentage/height)*height)
      })
     });
  }*/

  render() {
    return (
      <>
        <Appbar style={styles.barra}>
          <Text style={styles.logo}>SavePet</Text>
        </Appbar>
        <View style={styles.background}>
      
          <View style={styles.container}>
                <Image
              style={styles.image}
              source={{
                uri: this.state.base64 + this.props.route.params.animal.image,
              }}
            />
            <Text> Nombre: {this.props.route.params.animal.name}</Text>
            <Divider />
            <Text> Edad: {this.props.route.params.animal.age}</Text>
            <Divider />
            <Text> Color: {this.props.route.params.animal.colour}</Text>
            <Divider />

            <Text> Ciudad: {this.props.route.params.animal.city}</Text>
            <Divider />

            <Text> Estado actual: {this.props.route.params.animal.status}</Text>
            <Divider />
            <Text> Tamaño: {this.props.route.params.animal.size}</Text>
            
            <Text> ID usuario: {this.props.route.params.animal.id_user}</Text>

          </View>
          <Button
            style={styles.button}
            color="blue"
            onPress={() => {
              this.props.navigation.navigate('EmailScreen')
            }}>
            Solicitar adopción
          </Button>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  barra: {
    backgroundColor: '#E67E00',
  },
  logo: {
    fontFamily: 'Butler-Light',
    color: 'white',
    fontSize: 25,
    marginLeft: 14,
    alignSelf: 'center',
  },
  container: {
    marginTop: 40,
    marginHorizontal: 10,
    flex: 1,
    padding: 20,
    width: '100%',
    
  },
  text: {
    fontFamily: 'OpenSans-Bold',
    color: '#69e000',
    fontSize: 20,
    marginTop: 5,
  },
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius:5,
    //alignSelf: 'center',
    //alignItems: 'center',
  },
});
