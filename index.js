import { AppRegistry } from 'react-native';
import App from './App';
import 'regenerator-runtime/runtime';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);