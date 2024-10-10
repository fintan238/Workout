// index.web.js
import { AppRegistry } from 'react-native';
import App from '../App';
import { name as appName } from './src/app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});