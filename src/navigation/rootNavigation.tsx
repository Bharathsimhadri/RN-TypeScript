import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import AddEmployee from '../screens/crudOperations/addEmployee';
import CurrencyListScreen from '../screens/currency/currencyListScreen';
import FavouriteCurrencyScreen from '../screens/currency/favouriteCurrencyScreen';
import HomeScreen from '../screens/homeScreen';
import Operations from '../screens/crudOperations/operations';
import ScanImageScreen from '../screens/ocr/scanImageScreen';
const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="homeScreen">
        <Stack.Screen
          name="currencyListScreen"
          component={CurrencyListScreen}
        />
         <Stack.Screen
          name="favouriteCurrencyScreen"
          component={FavouriteCurrencyScreen}
        />
         <Stack.Screen
          name="scanImageScreen"
          component={ScanImageScreen}
        />
        <Stack.Screen
          name="homeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name="addEmployee"
          component={AddEmployee}
        />
        <Stack.Screen
          name="operations"
          component={Operations}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
