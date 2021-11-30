import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Appbar, FAB, Card, Button} from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
import {ScrollView} from 'react-native-gesture-handler';
import {DrawerActions} from '@react-navigation/native';
var SecurityUtils = require('../utils/SecurityUtils');

var SecurityUtils = require('../utils/SecurityUtils');

export default class EmailChangeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animals: [],
      paginationInfo: {},
      loading: true,
      page: 0,
      base64: 'data:image/png;base64,',
      width: 80,
      height: 80,
    };
  }

  componentDidMount() {
    this.setState({
      animals: this.state.animals.concat(
        this.props.route.params.response.pages,
      ),
      paginationInfo: this.props.route.params.response.paginationInfo,
      loading: false,
    });
    //console.log(this.state.animals)
  }

  render() {
    return (
      <>
        <Appbar style={styles.barra}>
          <Appbar.Action
            icon="menu"
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.openDrawer())
            }
          />
          <Text style={styles.logo}>SavePet</Text>
        </Appbar>
        <View style={styles.background}>
          <ScrollView style={styles.background}>
            <View style={styles.container}>
              <Text style={styles.text}>Animales disponibles</Text>
            </View>
            {this.state.animals[0] === undefined ? (
              <>
                <View style={styles.container}>
                  <Text style={styles.label}>
                    Ningún animal cumple con esas características
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('NewSearchAnimalScreen')
                    }>
                    <Text style={styles.link}>
                      ¿Quieres probar con otros filtros?
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              this.state.animals.map(animal => {
                return (
                  <Card key={animal.name}>
                    <Card.Title
                      title={animal.name}
                      titleStyle={styles.title}
                      subtitle={
                        'Sexo: ' +
                        animal.sex +
                        '\n' +
                        ' Edad: ' +
                        animal.age +
                        ' Ciudad: ' +
                        animal.city
                      }
                      subtitleStyle={styles.subtitle}
                      left={() => (
                        <Image
                          style={{
                            width: this.state.width,
                            height: this.state.height,
                            borderRadius: 5,
                          }}
                          source={{uri: this.state.base64 + animal.image}}
                        />
                      )}
                    />

                    <Card.Actions>
                      <Button
                        onPress={() =>
                          this.props.navigation.navigate('AnimalDetailScreen', {
                            animal: animal,
                          })
                        }>
                        Ver detalles
                      </Button>
                    </Card.Actions>
                  </Card>
                );
              })
            )}
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barra: {
    backgroundColor: '#E67E00',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  logo: {
    fontFamily: 'Butler_Light',
    color: 'white',
    fontSize: 25,
    marginLeft: 14,
    alignSelf: 'center',
  },
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  text: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    marginTop: 5,
  },
  subtitle: {
    marginLeft: 30,
    fontSize: 15,
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: 30,
    fontSize: 20,
  },
});
