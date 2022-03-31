import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import CurrencyListScreen from '../screens/currency/currencyListScreen';
import FavouriteCurrencyScreen from '../screens/currency/favouriteCurrencyScreen';
import ScanImageScreen from '../screens/ocr/scanImageScreen';
const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="scanImageScreen">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
