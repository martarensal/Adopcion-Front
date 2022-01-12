import React from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {List} from 'react-native-paper';
import {Appbar} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import HeaderAppbar from '../components/HeaderAppbar';

export default class EditAnimalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: 'data:image/png;base64,',
      width: 0,
      height: 0,
    };
  }
  componentDidMount() {
    Image.getSize(
      this.state.base64 + this.props.route.params.animal.image,
      (width, height) => {
        screen_percentage = 0.55;
        this.setState({
          width:
            ((Dimensions.get('screen').width * screen_percentage) / width) *
            width,
          height:
            ((Dimensions.get('screen').height * screen_percentage) / height) *
            height,
        });
      },
    );
  }

  render() {
    return (
      <>
        <HeaderAppbar />
        <ScrollView style={styles.background}>
          <View style={styles.container}>
            <Text style={styles.title}>
              {' '}
              Editar perfil de {this.props.route.params.animal.name}{' '}
            </Text>
            <List.Item
              title="Nombre"
              description={this.props.route.params.animal.name}
              onPress={() => {
                this.props.navigation.navigate('AnimalNameChangeScreen', {
                  id: this.props.route.params.animal.id,
                  name: this.props.route.params.animal.name,
                });
              }}
            />
            <List.Item
              title="Foto"
              onPress={() => {
                this.props.navigation.navigate('AnimalImageChangeScreen', {
                  id: this.props.route.params.animal.id,
                  image: this.props.route.params.animal.image,
                });
              }}
            />
            <Image
              style={{
                width: this.state.width,
                height: this.state.height,
                borderRadius: 5,
                marginLeft: 25,
              }}
              source={{
                uri: this.state.base64 + this.props.route.params.animal.image,
              }}
            />
            <List.Item
              title="Edad"
              description={this.props.route.params.animal.age}
              onPress={() => {
                this.props.navigation.navigate('AnimalAgeChangeScreen', {
                  id: this.props.route.params.animal.id,
                  age: this.props.route.params.animal.age,
                });
              }}
            />
            <List.Item
              title="Sexo"
              description={this.props.route.params.animal.sex}
              onPress={() => {
                this.props.navigation.navigate('AnimalSexChangeScreen', {
                  id: this.props.route.params.animal.id,
                  sex: this.props.route.params.animal.sex,
                });
              }}
            />
            <List.Item
              title="Color"
              description={this.props.route.params.animal.colour}
              onPress={() => {
                this.props.navigation.navigate('AnimalColourChangeScreen', {
                  id: this.props.route.params.animal.id,
                  colour: this.props.route.params.animal.colour,
                });
              }}
            />
            <List.Item
              title="Estado"
              description={this.props.route.params.animal.status}
              onPress={() => {
                this.props.navigation.navigate('AnimalStatusChangeScreen', {
                  id: this.props.route.params.animal.id,
                  status: this.props.route.params.animal.status,
                });
              }}
            />
            <List.Item
              title="Tamaño"
              description={this.props.route.params.animal.size}
              onPress={() => {
                this.props.navigation.navigate('AnimalSizeChangeScreen', {
                  id: this.props.route.params.animal.id,
                  size: this.props.route.params.animal.size,
                });
              }}
            />
            <List.Item
              title="Ciudad"
              description={this.props.route.params.animal.city}
              onPress={() => {
                this.props.navigation.navigate('AnimalCityChangeScreen', {
                  id: this.props.route.params.animal.id,
                  city: this.props.route.params.animal.city,
                });
              }}
            />
            <List.Item
              title="Tipo"
              description={this.props.route.params.animal.type}
              onPress={() => {
                this.props.navigation.navigate('AnimalTypeChangeScreen', {
                  id: this.props.route.params.animal.id,
                  type: this.props.route.params.animal.type,
                });
              }}
            />
          </View>
        </ScrollView>
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
    flex: 1,
    marginLeft: 25,
  },
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  title: {
    marginVertical: 15,
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
