import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import CurrencyListScreen from '../screens/currency/currencyListScreen';
const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="currencyListScreen">
        <Stack.Screen
          name="currencyListScreen"
          component={CurrencyListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
