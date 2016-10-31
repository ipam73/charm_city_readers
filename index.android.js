import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Root from './src/native';
import configureStore from './src/store/configureStore.js';

const store = configureStore();

function AndroidApp() {
  return (
    <Root store={store} />
  );
}

AppRegistry.registerComponent('charm_city_readers', () => AndroidApp);
