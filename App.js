import React from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import { DrawerNavigator, StackNavigator } from "react-navigation"
import { createStore } from "redux";
import { Provider } from 'react-redux'
import reducer from './client/redux/reducer';
// my component imports
import Welcome from './client/components/welcome/Welcome'
import Login from './client/components/login/Login'
import About from './client/components/about/About'
import Dashboard from './client/components/dashboard/Dashboard'
import CustomNav from './client/components/navigation/CustomNav'

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
)

/** Here to give permanent header for DrawerNav hamburger button to always show easily. */
const StackNav = StackNavigator(
  {
    App: {
      screen: AppNav
    }
  },
  {
    initialRouteName: 'App'
  }
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
