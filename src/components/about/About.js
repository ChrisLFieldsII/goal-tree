import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";

class About extends Component {

  static navigationOptions = {
    title: 'About',
  };



  render() {
    return (
      <View>
        <Text>About</Text>
      </View>
    );
  }
}

export default About;