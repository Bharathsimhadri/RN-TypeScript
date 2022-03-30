import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import {getCurrencyList} from '../../services/currency/getCurrency';
import {
  CREATE_CURRENCY_QUERY,
  INSERT_CURRENCY_QUERY,
  SEARCH_CURRENCY_QUERY,
} from '../../constant/query-constants';
import {createTable, insertData} from '../../constant/local-db';

const CurrencyListScreen = () => {
  const dispatch = useDispatch();

  const fetchedCurrencies = useSelector(
    state => state.currencyReducer?.GetCurrencySuccess,
  );
  const [dsiplayedCurrencies, setDsiplayedCurrencies] = useState([]);

  useFocusEffect(
    useCallback(() => {
      createTable(CREATE_CURRENCY_QUERY, SEARCH_CURRENCY_QUERY);
      dispatch(getCurrencyList());
    }, []),
  );

  useEffect(() => {
    setDsiplayedCurrencies(fetchedCurrencies);
  }, [fetchedCurrencies]);

  const onItemTapped = async (item: any) => {
    var index = dsiplayedCurrencies.findIndex(
      country => country.currency == item.currency,
    );
    var params = [index, item.name, item.currency];
    await insertData(INSERT_CURRENCY_QUERY, params);
  };

  const renderListItem = (item: any) => {
    return (
      <TouchableOpacity onPress={() => onItemTapped(item.item)}>
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
              flex: 1,
              textAlign: 'left',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {item?.item?.name}
          </Text>
          <Text
            style={{
              color: 'green',
              flex: 1,
              textAlign: 'right',
              fontSize: 16,
              fontWeight: 'bold',
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
      data={dsiplayedCurrencies}
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

export default CurrencyListScreen;
