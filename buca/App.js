import React, {Component} from 'react';
import {Text, CheckBox, Linking} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import DeepLinking from 'react-native-deep-linking';

import Index from './src/screens/LoginScreen/Index';
import Register from './src/screens/RegisterScreen/Index';
import Home from './src/screens/Design/Design_buca';
import Design from './src/screens/HomeScreen/Home';
import Choose from './src/screens/Choose_templates/Choose_templates';
import CreateDesign from './src/components/CreateDesign';
import BuiltDesign from './src/screens/BuiltDesign/BuiltDesign';
import Dashboard from './src/screens/Dashboard/Dashboard';
import Qrgen from './src/screens/Qrgenerator/Qrgenerator';
import Templates from './src/screens/Templates/Templates';
import ReduxStore from './src/reducer/store';
import Chat from './src/screens/Chat/Chat';
import ChattingScreen from './src/screens/ChattingScreen/ChattingScreen';
import QrConatiner from './src/screens/QrContainer/QrContainer';
import ContactsList from './src/screens/ContactsList/ContactsList';
const Stack = createStackNavigator();

class App extends Component {
  state = {
    response: {},
  };
  componentDidMount() {
    DeepLinking.addScheme('https://buca.yourbuca');
    Linking.addEventListener('url', this.handleUrl);

    DeepLinking.addRoute('/businessid', (response) => {
      // example://test
      this.setState({response});
    });

    DeepLinking.addRoute('/businessid/:id', (response) => {
      // example://test/23
      this.setState({response});
      alert(response.id);
    });

    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          DeepLinking.evaluateUrl(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  }
  handleUrl = ({url}) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  };
  render() {
    return (
      <Provider store={ReduxStore}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Chat">
            <Stack.Screen
              name="Index"
              component={Index}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ContactsList"
              component={ContactsList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="QrContainer"
              component={QrConatiner}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChattingScreen"
              component={ChattingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Design"
              component={Design}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Choose"
              component={Choose}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CreateDesign"
              component={CreateDesign}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BuiltDesign"
              component={BuiltDesign}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Qrgen"
              component={Qrgen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Templates"
              component={Templates}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
/*

            
*/
