import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from "react-navigation"
// my component imports
import Welcome from './client/components/welcome/Welcome'
import Login from './client/components/login/Login'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppStack />
      </View>
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
        initialRouteName: 'login' // <-- login for dev purposes. should be 'welcome'!
    }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
