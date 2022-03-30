/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';

import configureStore from './src/configureStore';
import RootNavigation from './src/navigation/rootNavigation';

const App = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
