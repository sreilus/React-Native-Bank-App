import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import MusicApp from './app/index';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Index from '../React-Native-Bank-App/app/index';
import HomeScreen from '..//React-Native-Bank-App/Screens/HomeScreen';
import Register from '..//React-Native-Bank-App/Screens/Register';
import AppNavigator from './AppNavigator';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Index: {screen: Index},
  Register: {screen: Register}
});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };

    createAppContainer(MainNavigator);
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require('./assets/img_bank.jpg')]);

    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return <AppNavigator/>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
