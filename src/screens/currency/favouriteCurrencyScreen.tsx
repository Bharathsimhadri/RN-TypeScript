import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

import {SELECT_CURRENCY_QUERY} from '../../constant/query-constants';
import {retriveData,createConnection} from '../../constant/local-db';

const FavouriteCurrencyScreen = () => {
  const [isLoaderBusy, setIsLoaderBusy] = useState(false);
  const [favouriteCurrencies, setFavouriteCurrencies] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getCurrenciesFromLocalDB();
    }, []),
  );

  // const getDataFromDb = async () => {
  //   setIsLoaderBusy(true);
  //   var data = await retriveData(SELECT_CURRENCY_QUERY);
  //   setIsLoaderBusy(false);
  //   console.log('Data************** in screen',data,data?.length);
  //   if (data?.length > 0) {
  //     setFavouriteCurrencies(data);
  //   }
  // };

  const getCurrenciesFromLocalDB=async()=>{
    var db=await createConnection();
     db.transaction( txx => {
      txx.executeSql(
        SELECT_CURRENCY_QUERY,
        [],
        (tx, resultss) => {
          var temp = [];
          console.log('retriveData Data**************');
          for (let i = 0; i < resultss.rows.length; ++i) {
            temp.push(resultss.rows.item(i));
          }
          console.log('retriveData Data**************',temp?.length);
          setFavouriteCurrencies(temp);
        },
        err => {
          console.log('error in retriveData********************', err);
        },
      );
    });
  }

  const onItemTapped = async (item: any) => {
    // var index = favouriteCurrencies.findIndex(
    //   country => country.currency == item.currency,
    // );
    // var params = [index, item.name, item.currency];
    // await insertData(INSERT_CURRENCY_QUERY, params);
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
          <Text
            style={{
              color: 'green',
              flex: 1,
              textAlign: 'right',
              fontSize: 16,
              fontWeight: '200',
            }}>
            {item?.item?.currency}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      keyExtractor={() => Math.random().toString()}
      data={favouriteCurrencies}
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
              Loading.....
            </Text>
          </View>
        );
      }}
      renderItem={renderListItem}
    />
  );
};

export default FavouriteCurrencyScreen;
