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
import HeaderAppbar from '../components/HeaderAppbar';
var SecurityUtils = require('../utils/SecurityUtils');

var SecurityUtils = require('../utils/SecurityUtils');

export default class AnimalsFilterScreen extends React.Component {
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
  }

  render() {
    return (
      <>
        <HeaderAppbar />
          <ScrollView style={styles.background}>
            <View style={styles.container}>
              <Text style={styles.title}>Animales disponibles</Text>
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
                  <Card style={styles.card}key={animal.id}>
                    <Card.Title
                      title={animal.name}
                      titleStyle={styles.text}
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

                    <Card.Actions style={styles.button}>
                      <Button
                        color="#E67E00"
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
      </>
    );
  }
}

const styles = StyleSheet.create({
  card:{
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 20,
    marginBottom: 15,
    marginLeft: 40,
  },
  subtitle: {
    marginLeft: 40,
    fontSize: 15,
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    marginBottom: 15,
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    color: '#E67E00',
    justifyContent: 'flex-end',
  },
});
