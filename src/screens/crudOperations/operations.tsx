import React, {useState, useEffect, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

import {createConnection, deleteData} from '../../constant/local-db';
import {
  SELECT_EMPLOYEE_QUERY,
  DELETE_EMPLOYEE_QUERY,
} from '../../constant/query-constants';

const Operations = () => {
  const [names, setNames] = useState([]);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getDataFromLocalDB();
    }, []),
  );

  const getDataFromLocalDB = async () => {
    var db = await createConnection();
    db.transaction(txx => {
      txx.executeSql(
        SELECT_EMPLOYEE_QUERY,
        [],
        (tx, resultss) => {
          var temp = [];
          //console.log('retriveData Data**************');
          for (let i = 0; i < resultss.rows.length; ++i) {
            if (resultss.rows.item(i)?.name) temp.push(resultss.rows.item(i));
          }
          //console.log('retriveData Data**************', temp);
          setNames(temp);
        },
        err => {
          console.log('error in retriveData********************', err);
        },
      );
    });
  };

  const onEditClicked = item => {
    var data = {
      isToEdit: true,
      data: item,
    };
    navigation.replace('addEmployee', data);
  };

  const onDeleteClicked = item => {
    console.log('item******', item);
    deleteData(DELETE_EMPLOYEE_QUERY, [item?.item?.id]);
    console.log('length of array', names.length);
    var arr = [];
    names.forEach(data => {
      if (data.id !== item.item.id) {
        arr.push(data);
      }
    });
    //var updatedList = names.filter(name => name.id !== item.id);
    console.log('length of array', arr.length);
    setNames(arr);
  };
  const renderListItem = (item: any) => {
    return (
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            padding: 15,
            margin: 10,
            borderWidth: 1,
            borderColor: 'Black',
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: 'black',
              flex: 1,
              textAlign: 'left',
              fontSize: 18,
              fontWeight: '500',
            }}>
            {item?.item?.name}
          </Text>
          <TouchableOpacity
            onPress={() => onEditClicked(item)}
            style={{flex: 0.5, backgroundColor: 'blue', margin: 5, padding: 5}}>
            <Text style={{textAlign: 'center'}}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDeleteClicked(item)}
            style={{flex: 0.5, backgroundColor: 'red', margin: 5, padding: 5}}>
            <Text style={{textAlign: 'center'}}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      keyExtractor={() => Math.random().toString()}
      data={names}
      ListEmptyComponent={() => {
        return (
          <View
            style={{
              alignItems: 'center',
              alignContent: 'center',
              height: '100%',
              flex: 1,
              justifyContent: 'center',
              width: '100%',
            }}>
            <Text
              style={{
                color: 'green',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              No data available...
            </Text>
          </View>
        );
      }}
      renderItem={renderListItem}
    />
  );
};

export default Operations;
