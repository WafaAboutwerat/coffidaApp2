import React, { Component } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

import SignUp from './components/SignUp';
import login from './components/login';
import Home from './components/Home';
import Account from './components/Account';
import shopinfo from './components/shopinfo';
import showreviews from './components/showreviews';
import addreview from './components/addreview';
import EditAccount from './components/EditAccount';



const Stack = createStackNavigator()

class App extends Component {
  render(){
    return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="login" component={login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="shopinfo" component={shopinfo} />
      <Stack.Screen name="showreviews" component={showreviews} />
      <Stack.Screen name="addreview" component={addreview} />
      <Stack.Screen name="EditAccount" component={EditAccount} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  };
}



export default App
