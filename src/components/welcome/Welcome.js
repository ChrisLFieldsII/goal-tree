import React from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import { loggedOut } from "../../redux/actions";
import firebase from "react-native-firebase";
import AppBtn from '../general/AppBtn';
import { NO_NAME } from "../../assets/utils/constants";

class Welcome extends React.Component {

  render() {
    const { loggedIn, user, navigation } = this.props;
    return (
      <ImageBackground style={styles.container} source={require('../../assets/imgs/shooting-star.jpg')}>
        <Text style={[styles.text, { fontSize: 40, fontWeight: 'bold', marginTop: 10 }]}>Goal Tree</Text>
        {loggedIn ? <Text style={styles.greetingText}>{this.displayGreeting()}</Text> : null}
        <Text style={[styles.text, { fontSize: 30, textAlign: 'center', }]}>Welcome to the realization of your goals!</Text>
        <View style={{ flex: 2 }}>
          {!loggedIn ? <AppBtn text="Login" margin={4} fontSize={22} onPress={() => navigation.navigate('Login')} /> : null}
          {loggedIn ? <AppBtn text="Dashboard" margin={4} fontSize={22} onPress={() => navigation.navigate('Dashboard')} /> : null}
          <AppBtn text="About" margin={4} fontSize={22} onPress={() => navigation.navigate('About')} />
          {loggedIn ? <AppBtn text="Logout" margin={4} fontSize={22} onPress={this.logout.bind(this)} /> : null}
        </View>
      </ImageBackground>
    )
  }

  async logout() {
    this.props.dispatchLoggedOut();
    await firebase.auth().signOut();
  }

  displayGreeting() {
    const { user } = this.props;
    const hour = new Date().getHours();
    console.log(hour);
    if (hour >= 5 && hour < 12) return `Good Morning ${user.displayName || NO_NAME}`;
    else if (hour >= 12 && hour <= 17) return `Good Afternoon ${user.displayName || NO_NAME}`;
    else return `Good Evening ${user.displayName || NO_NAME}`;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#f5f5f5',
    textShadowColor: '#4d79ff',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3,
    flex: 1,
    textAlign: 'center',
  },
  greetingText: {
    color: '#f5f5f5',
    fontSize: 30,
    marginBottom: 10,
    textShadowColor: 'red',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    textAlign: 'center',
  },
})

const mapStateToProps = state => {
  return {
    user: state.user,
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchLoggedOut: () => dispatch(loggedOut()),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Welcome);