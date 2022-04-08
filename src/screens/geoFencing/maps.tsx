import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  PermissionsAndroid,
  Modal,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, Polyline, Polygon} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const Maps = () => {
  const mapRef = React.createRef();
  const [userLatLang, setUserLatLan] = useState({
    latitude: 20.5937,
    longitude: 83.9683585,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [coordinates, setCoordinates] = useState([
    {latitude: 18.2949, longitude: 83.8938},
  ]);

  useFocusEffect(
    useCallback(() => {
      _checkPermission();
    }, []),
  );

  const _checkPermission = async () => {
    try {
      const result = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log('result', typeof result);
      console.log('result', result);

      if (result == true) {
        getCurrentUserLocation();
      } else if (result == false) {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === 'never_ask_again') {
          // Your code
        } else if (status === 'denied') {
          _checkPermission();
        } else if (status === 'granted') {
          getCurrentUserLocation();
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const getCurrentUserLocation = async () => {
    Geolocation.getCurrentPosition(
      info => {
        console.log('sucess', info);
        mapRef.current.animateToRegion({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setCoordinates(prevData => [
          ...prevData,
          {latitude: info.coords.latitude, longitude: info.coords.longitude},
        ]);
        setUserLatLan({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      err => {
        console.log('error****', err);
      },
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      <MapView
        ref={mapRef}
        style={{height: '100%', width: '100%'}}
        initialRegion={{
          latitude: userLatLang.latitude,
          longitude: userLatLang.longitude,
          latitudeDelta: userLatLang.latitudeDelta,
          longitudeDelta: userLatLang.longitudeDelta,
        }}>
        {/* <MapViewDirections
          origin={{
            latitude: coordinates[0]?.latitude,
            longitude: coordinates[0]?.longitude,
          }}
          destination={{
            latitude: coordinates[1]?.latitude,
            longitude: coordinates[1]?.longitude,
          }}
          apikey={'AIzaSyDw4sJ9cngHfbeJX5sLb8t1FkbsUgHNg00'}
          strokeWidth={4}
          strokeColor="#111111"
        /> */}
        <Polyline
          coordinates={coordinates}
          strokeColor="#000"
          strokeColors={['#7F0000']}
          strokeWidth={6}
        />
        <Marker
          coordinate={{
            latitude: userLatLang.latitude,
            longitude: userLatLang.longitude,
          }}
        />
        <Polygon
          coordinates={coordinates}
          fillColor="rgba(0, 200, 0, 0.5)"
          strokeColor="rgba(0,0,0,0.5)"
          strokeWidth={2}
        />
      </MapView>
    </View>
  );
};

export default Maps;
