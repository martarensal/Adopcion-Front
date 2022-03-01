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
import {getAnimalRequests} from '../client/AnimalApi';
import {getUser} from '../client/UsersApi';
import HeaderAppbar from '../components/HeaderAppbar';

var SecurityUtils = require('../utils/SecurityUtils');

export default class AnimalRequestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animalRequests: [],
      paginationInfo: {},
      loading: true,
      page: 0,
    
    };
    this.fetchAnimalRequests = this.fetchAnimalRequests.bind(this);
  }
  showMoreAnimalRequests() {
    this.setState({page: this.state.page + 1}, () => this.fetchAnimalRequests());
  }

  handleGetAnimalRequestsResponse(response) {
    console.log(response)
    response.json().then(data => {
        console.log(typeof(data.pages) + ' TYPE OF')
        console.log(data.pages)
        console.log(typeof(data.paginationInfo) + ' TYPE OF')
        console.log(data.paginationInfo)

        this.setState({
        animalRequests: this.state.animalRequests.concat(data.pages),
        paginationInfo: data.paginationInfo,
        loading: false,
      },  () => console.log( this.state.animalRequests[0].startDate +' EEEEEEE'))
    }
    );
  }

  fetchAnimalRequests() {
    if (this.state.page === 0) this.setState({loading: true});
    SecurityUtils.authorizeApi(
      [this.props.route.params.idAnimal, this.state.page, 6],
      getAnimalRequests,
    ).then(this.handleGetAnimalRequestsResponse.bind(this));
  }
  fetchUserData(){
        SecurityUtils.authorizeApi([], getUser).then(
        this.handleGetUserResponse.bind(this),
      );
  }

 componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      'focus',
      this.fetchAnimalRequests.bind(this),
    );

    this._outOfFocus = this.props.navigation.addListener('blur', () =>
      this.setState({animalRequests: [], page: 0}),
    );
  }
  componentWillUnmount() {
    this._unsubscribe();
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
        <HeaderAppbar/>
        <ScrollView style={styles.background}>
          <View style={styles.container}>
            <Text style={styles.titleText}> Solicitudes</Text>   
             {this.state.animalRequests.map(animalRequest => {
              return (
                <Card key={animalRequest.id}>
                  <Divider style={styles.divider} />
                  <Card.Title
                    style={styles.cardStyle}
                    title={animalRequest.status}
                    titleStyle={styles.title}
                    subtitle={this.getCurrentDate(animalRequest.startDate) + ' ' +
                    this.getCurrentDate(animalRequest.endDate)
                    }
                    subtitleStyle={styles.subtitle}
                  />
                  
                      <Card.Actions>
                     
                        <Button
                          color="#F5C401"
                          onPress={() =>
                            this.props.navigation.navigate('RequestStatusChangeScreen', {
                              id: animalRequest.id,
                              status: animalRequest.status,
                            })
                          }>
                          Modificar
                        </Button>
                        </Card.Actions>

                </Card>
              );
            })}
            {this.state.page !== this.state.paginationInfo.totalPages - 1 &&
            this.state.paginationInfo.totalElements !== 0 ? (
              <Button
                color="#F05524"
                onPress={this.showMoreAnimalRequests.bind(this)}>
                VER MÁS
              </Button>
            ) : undefined}  
            
          </View>
        </ScrollView>
    </>
    );
  }
}

const styles = StyleSheet.create({
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
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: 30,
  },
});
