import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from "react-navigation"
import { createStore } from "redux";
import { Provider } from 'react-redux'
import reducer from './client/redux/reducer';
// my component imports
import Welcome from './client/components/welcome/Welcome'
import Login from './client/components/login/Login'
import About from './client/components/about/About'
import Dashboard from './client/components/dashboard/Dashboard'
import Register from './client/components/register/Register'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppStack />
        </View>
      </Provider>
    )
  }
}

// TODO: refactor screens obj/config into separate file
const AppStack = StackNavigator(
  {
    welcome: {
      screen: Welcome
    },
    login: {
      screen: Login
    },
    about: {
      screen: About
    },
    dashboard: {
      screen: Dashboard
    },
    register: {
      screen: Register
    }
  },
  { // start of config obj
    initialRouteName: 'welcome',    
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
