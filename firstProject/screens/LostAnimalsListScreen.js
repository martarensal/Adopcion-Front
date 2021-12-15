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
    //if (this.state.page === 0) this.setState({loading: true});
    SecurityUtils.authorizeApi([0, 25], getPaginatedPublications).then(
      this.handleGetPublicationResponse.bind(this),
    );
  }

  componentDidMount() {
    /*this.setState({
      publications: this.state.publications.concat(
        this.props.route.params.response.pages,
      ),
      paginationInfo: this.props.route.params.response.paginationInfo,
      loading: false,
    });*/
    this.fetchPublications();
    //this.state.publications.map(publication => this.setState({publication.publicationDate: publication.publicationDate})
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
        {this.state.publications.map(publication => {
          return (
                  <Card key={publication.image}>
                    <Card.Title
                      title={publication.publicationDate/*.toISOString().substring(0, '####-##-##'.length)*/}
                      titleStyle={styles.title}
                      subtitle={
                        'Descripcion: ' +
                        publication.description 
                      }
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
              })
              }
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
