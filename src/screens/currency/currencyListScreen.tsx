import React, {useState, useEffect, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect,useNavigation} from '@react-navigation/native';

import {createTable, insertData} from '../../constant/local-db';
import {
  CREATE_CURRENCY_QUERY,
  INSERT_CURRENCY_QUERY,
  SEARCH_CURRENCY_QUERY,
} from '../../constant/query-constants';
import {getCurrencyList} from '../../services/currency/getCurrency';
import Loader from '../../components/commonComponents/Loader';

const CurrencyListScreen = () => {
  const dispatch = useDispatch();
  const navigation=useNavigation();

  const fetchedCurrencies = useSelector(
    state => state.currencyReducer?.GetCurrencySuccess,
  );

  const [isLoaderBusy, setIsLoaderBusy] = useState(false);
  const [dsiplayedCurrencies, setDsiplayedCurrencies] = useState([]);

  useFocusEffect(
    useCallback(() => {
      createTable(CREATE_CURRENCY_QUERY, SEARCH_CURRENCY_QUERY);
      setIsLoaderBusy(true);
      dispatch(getCurrencyList());
      setIsLoaderBusy(false);
    }, []),
  );

  useEffect(() => {
    setDsiplayedCurrencies(fetchedCurrencies);
  }, [fetchedCurrencies]);

  useEffect(() => {
    console.log('isLoaderBusy********', isLoaderBusy);
  }, [isLoaderBusy]);

  const onItemTapped = async (item: any) => {
    var index = dsiplayedCurrencies.findIndex(
      country => country.currency == item.currency,
    );
    var params = [index, item.name, item.currency];
    await insertData(INSERT_CURRENCY_QUERY, params);
  };

  const navigateToFavouritesScreen=()=>{
    navigation.navigate('favouriteCurrencyScreen');
  }

  const onAddStoreClicked = async () => {
    var row = 0;
    setIsLoaderBusy(true);
    dsiplayedCurrencies.every(async element => {
      var index = dsiplayedCurrencies.findIndex(
        country => country.currency == element.currency,
      );
      var params = [index, element.name, element.currency];
      await insertData(INSERT_CURRENCY_QUERY, params);
      if (row >= 30) {
        return;
      }
      row++;
    });
    setIsLoaderBusy(false);
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
    <View>
      <FlatList
        keyExtractor={() => Math.random().toString()}
        data={dsiplayedCurrencies}
        ListHeaderComponent={() => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => onAddStoreClicked()}
                style={{padding: 15, backgroundColor: 'blue', margin: 10}}>
                <Text
                  style={{
                    color: 'white',
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: '200',
                  }}>
                  Add to store +
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToFavouritesScreen()}
                style={{padding: 15, backgroundColor: 'blue', margin: 10}}>
                <Text
                  style={{
                    color: 'white',
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: '200',
                  }}>
                  get from store +
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
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
      <Loader isVisible={isLoaderBusy} />
    </View>
  );
};

export default CurrencyListScreen;
