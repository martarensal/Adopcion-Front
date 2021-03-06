import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Appbar, FAB, Card, Button, Divider, Title, Paragraph } from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
import {ScrollView} from 'react-native-gesture-handler';
import {DrawerActions} from '@react-navigation/native';
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
      width: 100,
      height: 100,
    };
  }
  showMoreLostAnimals() {
    this.setState({page: this.state.page + 1}, () => this.fetchPublications());
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
    SecurityUtils.authorizeApi(
      [this.state.page, 6],
      getPaginatedPublications,
    ).then(this.handleGetPublicationResponse.bind(this));
  }

  componentDidMount() {
    this.fetchPublications();
  }
  getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '-' + month + '-' + year;
  };

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
          <View style={styles.container}>
            <Text style={styles.titleText}> Animales perdidos</Text>

            {this.state.publications.map(publication => {
              return (
                <Card key={publication.id} >
                      <Card.Cover style={styles.image} source={{ uri: this.state.base64 + publication.image }} />
                       <Card.Content>     
                         <View style={styles.textContent}>               
                       <Title style={styles.textStyle}>{this.getCurrentDate(publication.publicationDate)}</Title>
                        <Paragraph style={styles.textStyle}>{publication.description}</Paragraph>
                        </View>
                        </Card.Content> 
                  <Card.Actions style={styles.button}>
                    <Button
                      color="#E67E00"
                      onPress={() =>
                        this.props.navigation.navigate(
                          'LostAnimalDetailScreen',
                          {
                            publication: publication,
                          },
                        )
                      }>
                      Ver detalles
                    </Button>
                  </Card.Actions>
                </Card>
              );
            })}
            {this.state.page !== this.state.paginationInfo.totalPages - 1 &&
            this.state.paginationInfo.totalElements !== 0 ? (
              <Button
                color="#F05524"
                onPress={this.showMoreLostAnimals.bind(this)}>
                VER M??S
              </Button>
            ) : undefined}
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
  },
  button: {
    justifyContent: 'flex-end',
  },
  cardStyle: {
    marginLeft:10,
    marginBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
    backgroundColor: 'white',
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
    marginLeft: 60,
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 15,
  },
  titleText: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 20,
  },
  title: {
    fontFamily: 'RobotoSlab-Regular',
    color: '#575757',
    fontSize: 22,
    marginLeft: 60,
    marginBottom: 15,
    marginTop: 20,
  },
  image: {
    height: 300,
  },
});
