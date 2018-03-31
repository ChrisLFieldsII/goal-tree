import React from 'react'
import { StyleSheet, Text, View, Animated, Easing } from 'react-native'
import { StackNavigator } from "react-navigation"
import { createStore } from "redux";
import { Provider } from 'react-redux'
import reducer from './client/redux/reducer';
// my component imports
import Welcome from './client/components/welcome/Welcome'
import Login from './client/components/login/Login'

const store = createStore(reducer);

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

const AppStack = StackNavigator(
  {
    welcome: {
      screen: Welcome
    },
    login: {
      screen: Login
    },
  },
  {
    initialRouteName: 'login',    
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
