import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { DrawerNavigator, StackNavigator } from "react-navigation";
import { createStore } from "redux";
import { Provider } from 'react-redux';
import reducer from './src/redux/reducer';
// my component imports
import Welcome from './src/components/welcome/Welcome';
import Login from './src/components/login/Login';
import About from './src/components/about/About';
import Dashboard from './src/components/dashboard/Dashboard';
import CustomNav from './src/components/navigation/CustomNav';
import HamburgerBtn from './src/components/navigation/HamburgerBtn';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StackNav />
        </View>
      </Provider>
    )
  }
}


// TODO: refactor screens obj/config into separate file
const AppNav = DrawerNavigator(
  {
    Welcome: {
      screen: Welcome
    },
    Login: {
      screen: Login
    },
    About: {
      screen: About
    },
    Dashboard: {
      screen: Dashboard
    },
  },
  { // start of config obj
    initialRouteName: 'Welcome',   
    contentComponent: CustomNav,
  }
);

/** Here to give permanent header for DrawerNav hamburger button to always show easily. */
const StackNav = StackNavigator(
  {
    App: {
      screen: AppNav
    }
  },
  {
    initialRouteName: 'App',
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: '#000000',        
      },  
      headerTintColor: '#FFFFFF',
      headerLeft: <HamburgerBtn navigation={navigation} />,
      title: 'Goal Tree',
      headerTitleStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        textShadowColor: '#4d79ff',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 3,    
      }  
    }),    
  }
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
