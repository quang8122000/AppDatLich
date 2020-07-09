/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './src/srceens/flastlist';

import App from './App';
//import App from './src/srceens/Cartsrceen';
//import App from './src/srceens/Modal'
//import App from './src/srceens/Date'
//import App from './src/srceens/test';
//import App from './src/srceens/SignInsrceen'
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
console.disableYellowBox = true;
