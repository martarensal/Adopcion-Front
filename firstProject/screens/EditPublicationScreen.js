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

export default class EditPublicationScreen extends React.Component {
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
      this.state.base64 + this.props.route.params.publication.image,
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
            
            <List.Item
              title="Descripción"
              description={this.props.route.params.publication.description}
              onPress={() => {
                this.props.navigation.navigate('PublicationDescriptionChangeScreen', {
                  id: this.props.route.params.publication.id,
                  description: this.props.route.params.publication.description,
                });
              }}
            />
            <List.Item
              title="Foto"
              onPress={() => {
                this.props.navigation.navigate('PublicationImageChangeScreen', {
                  id: this.props.route.params.publication.id,
                  image: this.props.route.params.publication.image,
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
                uri: this.state.base64 + this.props.route.params.publication.image,
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
