import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen.js';
import WelcomeScreen from './screens/WelcomeScreen.js';
import RegistrationScreen from './screens/RegistrationScreen.js';
import MainScreen from './screens/MainScreen.js';
import SplashScreen from './screens/SplashScreen';
import SecurityUtils from './utils/SecurityUtils';
import LastnamesChangeScreen from './screens/LastnamesChangeScreen.js';
import NameChangeScreen from './screens/NameChangeScreen.js';
import UsernameChangeScreen from './screens/UsernameChangeScreen.js';
import EmailChangeScreen from './screens/EmailChangeScreen.js';
import PasswordChangeScreen from './screens/PasswordChangeScreen.js';
import PhoneChangeScreen from './screens/PhoneChangeScreen.js';
import MyAnimalsScreen from './screens/MyAnimalsScreen.js';
import CreateAnimalScreen from './screens/CreateAnimalScreen.js';
import EditAnimalScreen from './screens/EditAnimalScreen.js';
import AnimalColourChangeScreen from './screens/AnimalColourChangeScreen.js';
import AnimalNameChangeScreen from './screens/AnimalNameChangeScreen.js';
import AnimalAgeChangeScreen from './screens/AnimalAgeChangeScreen.js';
import AnimalSexChangeScreen from './screens/AnimalSexChangeScreen.js';
import AnimalStatusChangeScreen from './screens/AnimalStatusChangeScreen.js';
import AnimalSizeChangeScreen from './screens/AnimalSizeChangeScreen.js';
import AnimalTypeChangeScreen from './screens/AnimalTypeChangeScreen.js';
import AnimalCityChangeScreen from './screens/AnimalCityChangeScreen.js';
import AnimalImageChangeScreen from './screens/AnimalImageChangeScreen.js';
import MyProfileScreen from './screens/MyProfileScreen.js';
import NewSearchAnimalScreen from './screens/NewSearchAnimalScreen.js';
import AnimalsFilterScreen from './screens/AnimalsFilterScreen.js';

const Stack = createStackNavigator();
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserSignedIn: null,
      isLoading: true,
    };
  }

  async findExistingToken() {
    /*SecurityUtils.clearAll().then(
      SecurityUtils.getToken().then(this.handleRecieveToken.bind(this)),
    );*/
    SecurityUtils.getToken().then(token =>
      this.setState({isUserSignedIn: token, isLoading: false}),
    );
  }
  render() {
    this.findExistingToken();
    if (this.state.isLoading) {
      return <SplashScreen />;
    } else {
      return (
          <NavigationContainer>
            <Stack.Navigator>
              {this.state.isUserSignedIn == null ? (
                <>
                  <Stack.Screen
                    name="WelcomeScreen"
                    component={WelcomeScreen}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="RegistrationScreen"
                    component={RegistrationScreen}
                    options={{headerShown: false}}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="MainScreen"
                    component={MainScreen}
                    options={{headerShown: false}}
                  />
                    <Stack.Screen
                    name="LastnamesChangeScreen"
                    component={LastnamesChangeScreen}
                    options={{headerShown: false}}
                  />
                   <Stack.Screen
                    name="MyProfileScreen"
                    component={MyProfileScreen}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="NameChangeScreen"
                    component={NameChangeScreen}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="UsernameChangeScreen"
                    component={UsernameChangeScreen}
                    options={{headerShown: false}}
                  />
                   <Stack.Screen
                    name="EmailChangeScreen"
                    component={EmailChangeScreen}
                    options={{headerShown: false}}
                  /> 
                  <Stack.Screen
                  name="PasswordChangeScreen"
                  component={PasswordChangeScreen}
                  options={{headerShown: false}}
                  />
                  <Stack.Screen
                  name="PhoneChangeScreen"
                  component={PhoneChangeScreen}
                  options={{headerShown: false}}
                  />
                  <Stack.Screen
                  name="MyAnimalsScreen"

                  component={MyAnimalsScreen}
                  options={{headerShown: false}}
                  />
                  <Stack.Screen
                  name="CreateAnimalScreen"
                  component={CreateAnimalScreen}
                  options={{headerShown: false}}
                  />
                  <Stack.Screen
                  name="EditAnimalScreen"
                  component={EditAnimalScreen}
                  options={{headerShown: false}}
                  />
                  <Stack.Screen
                  name="AnimalNameChangeScreen"
                  component={AnimalNameChangeScreen}
                  options={{headerShown: false}}
                  />
                  <Stack.Screen
                  name="AnimalAgeChangeScreen"
                  component={AnimalAgeChangeScreen}
                  options={{headerShown: false}}
                  />
                  <Stack.Screen
                  name="AnimalSexChangeScreen"
                  component={AnimalSexChangeScreen}
                  options={{headerShown: false}}
                  />
                  <Stack.Screen
                  name="AnimalColourChangeScreen"
                  component={AnimalColourChangeScreen}
                  options={{headerShown: false}}
                  />
                  <Stack.Screen
                  name="AnimalStatusChangeScreen"
                  component={AnimalStatusChangeScreen}
                  options={{headerShown: false}}
                  />
                  <Stack.Screen
                  name="AnimalSizeChangeScreen"
                  component={AnimalSizeChangeScreen}
                  options={{headerShown: false}}
                  />
                  <Stack.Screen
                  name="AnimalTypeChangeScreen"
                  component={AnimalTypeChangeScreen}
                  options={{headerShown: false}}
                  />
                   <Stack.Screen
                  name="NewSearchAnimalScreen"
                  component={NewSearchAnimalScreen}
                  options={{headerShown: false}}
                  />
                  <Stack.Screen
                  name="AnimalCityChangeScreen"
                  component={AnimalCityChangeScreen}
                  options={{headerShown: false}}
                  />
                  
                  <Stack.Screen
                  name="AnimalImageChangeScreen"
                  component={AnimalImageChangeScreen}
                  options={{headerShown: false}}
                  />
                  <Stack.Screen
                  name="AnimalsFilterScreen"
                  component={AnimalsFilterScreen}
                  options={{headerShown: false}}
                  />
                   
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
      );


      }
    
  }
}
