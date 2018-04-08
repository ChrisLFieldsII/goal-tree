import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { NO_NAME } from '../../assets/utils/constants';


// TODO: Add StackNav for all Dashboard possibilities
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
    const { user, loggedIn } = this.props;
    let content = null

    if (loggedIn) content = (
      <View>
        <Text style={styles.greeting}>{`Welcome to your\nDashboard ${user.displayName || NO_NAME}`}</Text>
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
    //alignItems: 'center',
  },
  greeting: {
    textAlign: 'center',
    marginTop: 10,
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