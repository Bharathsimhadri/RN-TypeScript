import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import CurrencyListScreen from '../screens/currency/currencyListScreen';
import FavouriteCurrencyScreen from '../screens/currency/favouriteCurrencyScreen';
const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="currencyListScreen">
        <Stack.Screen
          name="currencyListScreen"
          component={CurrencyListScreen}
        />
         <Stack.Screen
          name="favouriteCurrencyScreen"
          component={FavouriteCurrencyScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
