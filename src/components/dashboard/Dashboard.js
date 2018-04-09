import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { NO_NAME } from '../../assets/utils/constants';
import AppBtn from '../general/AppBtn';


class Dashboard extends Component {

  /** Ensures only logged in users get access to Dashboard and its functions. */
  componentDidMount() {
    const { loggedIn, navigation } = this.props;
    if (!loggedIn) {
      Alert.alert('Please Login!', 'You must Login in order to use the Dashboard.',
        [{text: 'Login', onPress: () => navigation.navigate('Login')}], {cancelable: false});
    }
  }

  render() {
    const { user, loggedIn, navigation } = this.props;
    let content = null

    if (loggedIn) content = (
      <View>
        <Text style={styles.greeting}>{`Welcome to your\nDashboard ${user.displayName || NO_NAME}`}</Text>
        <AppBtn text="Set a Goal" margin={4} fontSize={16} height={30} onPress={() => navigation.navigate('SetGoal')} />
        <AppBtn text="View Goals" margin={4} fontSize={16} height={30} onPress={() => navigation.navigate('ViewGoals')} />
      </View>
    )
    else content = null

    return (
      <View style={styles.container}>{content}</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  greeting: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    loggedIn: state.loggedIn
  }
};

export default connect(mapStateToProps)(Dashboard);