import React, {useState, useEffect, useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {createTable, insertData, updateData} from '../../constant/local-db';
import {
  CREATE_EMPLOYEE_QUERY,
  SEARCH_EMPLOYEE_QUERY,
  INSERT_EMPLOYEE_QUERY,
  UPDATE_EMPLOYEE_QUERY,
} from '../../constant/query-constants';

const AddEmployee = props => {
  var navigation = useNavigation();

  const [name, setName] = useState(props?.route?.params?.data?.item?.name);
  const [isToEdit, setIsToEdit] = useState(props?.route?.params?.isToEdit);

  //console.log('props***************', props.route.params);

  useEffect(() => {
    createTable(CREATE_EMPLOYEE_QUERY, SEARCH_EMPLOYEE_QUERY);
  }, []);

  const onAddClicked = async () => {
    if (!name) {
      Alert.alert('Warning', ' Please fill name', [
        {
          text: 'Ok',
          onPress: () => {
            console.log('Ok clicked');
          },
        },
      ]);
    }
    if (!isToEdit) {
      await insertData(INSERT_EMPLOYEE_QUERY, [
        Math.floor(Math.random() * 100),
        name,
      ]);
    } else {
      console.log('update ******');
      await updateData(UPDATE_EMPLOYEE_QUERY, [
        name,
        props?.route?.params?.data?.item?.id,
      ]);
    }
    setName('');
  };
  return (
    <View
      style={{
        flex: 1,
        margin: 10,
      }}>
      <View
        style={{
          width: '100%',
        }}>
        <View style={{borderWidth: 1, borderColor: 'gray'}}>
          <TextInput
            placeholder="Enter your name "
            placeholderTextColor={'gray'}
            style={{color: 'gray'}}
            value={name}
            onChangeText={setName}
          />
        </View>
        {!isToEdit ? (
          <TouchableOpacity
            onPress={() => onAddClicked()}
            style={{
              padding: 10,
              marginTop: 10,
              height: '18%',
              backgroundColor: 'blue',
            }}>
            <Text
              style={{
                color: 'white',
                flex: 1,
                fontSize: 14,
                textAlign: 'center',
                fontWeight: '200',
              }}>
              Save
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => onAddClicked()}
            style={{
              padding: 10,
              marginTop: 10,
              height: '18%',
              backgroundColor: 'blue',
            }}>
            <Text
              style={{
                color: 'white',
                flex: 1,
                fontSize: 14,
                textAlign: 'center',
                fontWeight: '200',
              }}>
              Update
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.replace('operations');
          }}
          style={{
            padding: 10,
            marginTop: 10,
            height: '18%',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: 'blue',
          }}>
          <Text
            style={{
              color: 'white',
              flex: 1,
              fontSize: 14,
              textAlign: 'center',
              fontWeight: '200',
            }}>
            Get data
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddEmployee;
