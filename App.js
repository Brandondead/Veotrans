import React, { Component } from 'react';
import { YellowBox, AppState } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigator';
import store from './src/store';
import { StatusBar } from 'react-native';

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
    YellowBox.ignoreWarnings(['Warning: ...', 'Warning: ...']);
    // Tu código que desencadena warnings
    console.ignoredYellowBox = ['Warning: ReactNative.createElement'];
    console.disableYellowBox = true;


    // Manejar el cambio de estado de la aplicación
    this.appStateSubscription = AppState.addEventListener('change', this.handleAppStateChange);

  
  }

  componentWillUnmount() {
    
    this.appStateSubscription.remove();
  }



  render() {
    return (
      <Provider store={store}>
        <StatusBar hidden={true} />
        <AppNavigator />
      </Provider>
    );
  }
}
