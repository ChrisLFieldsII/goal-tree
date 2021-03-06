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
import CustomNav from './src/components/navigation/CustomNav';
import HamburgerBtn from './src/components/navigation/HamburgerBtn';
import SetGoal from './src/components/goals/SetGoal';
import ViewGoals from './src/components/goals/ViewGoals';
import DashboardNav from './src/components/dashboard/DashboardNav';

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


const AppNav = DrawerNavigator(
  {
    Login: {
      screen: Login
    },
    Welcome: {
      screen: Welcome
    },
    Dashboard: {
      screen: DashboardNav
    },
    About: {
      screen: About
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
    },
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

