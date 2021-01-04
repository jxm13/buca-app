/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import socket from './socketConn.js';
AppRegistry.registerHeadlessTask('socket', () => socket);
AppRegistry.registerComponent(appName, () => App);
