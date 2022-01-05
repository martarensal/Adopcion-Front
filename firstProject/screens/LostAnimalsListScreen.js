import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Appbar, FAB, Card, Button, Divider} from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
import {ScrollView} from 'react-native-gesture-handler';
import {DrawerActions} from '@react-navigation/native';
var SecurityUtils = require('../utils/SecurityUtils');
import {getPaginatedPublications} from '../client/AnimalApi';

var SecurityUtils = require('../utils/SecurityUtils');

export default class LostAnimalsListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      publications: [],
      paginationInfo: {},
      loading: true,
      page: 0,
      base64: 'data:image/png;base64,',
      width: 80,
      height: 80,
    };
  }
  handleGetPublicationResponse(response) {
    response.json().then(data =>
      this.setState({
        publications: this.state.publications.concat(data.pages),
        paginationInfo: data.paginationInfo,
        loading: false,
      }),
    );
  }

  fetchPublications() {
    SecurityUtils.authorizeApi([0, 25], getPaginatedPublications).then(
      this.handleGetPublicationResponse.bind(this),
    );
  }

  componentDidMount() { 
    this.fetchPublications();
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
        <ScrollView style={styles.background}>
          <Text style={styles.title}> Animales perdidos</Text>
          <View style={styles.container}>
            {this.state.publications.map(publication => {
              return (
                <Card  key={publication.id}>
                  <Divider style={styles.divider} />
                 
                  <Card.Title
                  style={styles.cardStyle}

                    title={
                      publication.publicationDate /*.toISOString().substring(0, '####-##-##'.length)*/
                    }
                    titleStyle={styles.title}
                    subtitle={publication.description}
                  
                    subtitleStyle={styles.subtitle}
                    left={() => (
                      <Image
                        style={{
                          width: this.state.width,
                          height: this.state.height,
                          borderRadius: 5,
                        }}
                        source={{uri: this.state.base64 + publication.image}}
                      />
                    )}
                  />
                </Card>
              );
            })}
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  cardStyle:{
    marginBottom: 60,
  },
  container: {
    flex: 1,
    marginLeft: 25,
    backgroundColor: '#fafafa',
  },
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  divider: {
    marginBottom: 40,
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
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
  },
  
      title: {
    marginLeft: 30,
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 20,
  },

    image: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: 30,
  },
});
