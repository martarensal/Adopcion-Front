import React from 'react';
import {Text, ScrollView, View, Image, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
export default class EditAnimalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        base64:'data:image/png;base64,'  }
  }
  componentDidMount(){
    console.log(this.props.route.params.animal)
  }
        

  render() {
    return (
      <ScrollView style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text}>{this.props.route.params.animal.name}</Text>
            <Image
                   style={styles.image}
                   source={{ uri: this.state.base64 + this.props.route.params.animal.image }}
           />
        </View>
        <List.Item
          title="Foto"
         
          onPress={() => {
            this.props.navigation.navigate('AnimalImageChangeScreen', {
              id: this.props.route.params.animal.id,
              image: this.props.route.params.animal.image,
            });
          }}
        />
        
        <List.Item
          title="Nombre"
          description={this.props.route.params.animal.name
          }
          onPress={() => {
            this.props.navigation.navigate('AnimalNameChangeScreen', {
              id: this.props.route.params.animal.id,
              name: this.props.route.params.animal.name,
            });
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
         
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    marginBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
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
    paddingTop: 30,
    width: 150,
    height: 150,
  },

});