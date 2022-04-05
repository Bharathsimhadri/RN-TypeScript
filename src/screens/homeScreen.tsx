import React, {useState, useEffect, useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('currencyListScreen');
        }}
        style={{padding: 5,height:'5%', backgroundColor: 'blue', margin: 10}}>
        <Text
          style={{
            color: 'white',
            flex: 1,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '200',
          }}>
          Api's
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('addEmployee');
        }}
        style={{padding: 5,height:'5%', backgroundColor: 'blue', margin: 10}}>
        <Text
          style={{
            color: 'white',
            flex: 1,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '200',
          }}>
          CRUD op's
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
