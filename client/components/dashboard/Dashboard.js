import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";

class Dashboard extends Component {

  static navigationOptions = {
    title: 'Dashboard',
  };


  render() {
    return (
      <View>
        <Text>Dashboard</Text>
      </View>
    );
  }
}

export default Dashboard;