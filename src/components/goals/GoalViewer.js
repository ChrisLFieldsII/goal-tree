import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, SectionList } from 'react-native';

class GoalViewer extends Component {
  
  render() {
    console.log(this.props.navigation.state)
    return (
      <View>
        <Text>Goal Viewer</Text>        
      </View>
    );
  }
}

export default GoalViewer;