import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";


// TODO: Add StackNav for all Dashboard possibilities
class Dashboard extends Component {

  /** Ensures only logged in users get access to Dashboard and its functions. */
  componentDidMount() {
    const { loggedIn, navigation } = this.props;
    if (!loggedIn) {
      Alert.alert('Please Login!', 'You must Login in order to use the Dashboard.',
        [{text: 'Login', onPress: () => navigation.navigate('Login')}], {cancelable: false})
    }
  }

  render() {
    return (
      <View>
        <Text>Dashboard</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(Dashboard);