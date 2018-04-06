import React from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import { loggedOut } from "../../redux/actions";
import firebase from "react-native-firebase";

class Welcome extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Welcome'
  }

  render() {
    const { loggedIn, user, navigation } = this.props;
    return (
      <ImageBackground style={styles.container} source={require('../../assets/imgs/shooting-star.jpg')}>
        <Text style={[styles.text, { fontSize: 40, fontWeight: 'bold', marginTop: 10 }]}>Goal Tree</Text>
        {loggedIn ? <Text style={styles.greetingText}>{this.displayGreeting()}</Text> : null}
        <Text style={[styles.text, { fontSize: 30, textAlign: 'center', }]}>Welcome to the realization of your goals!</Text>
        <View style={{ flex: 2 }}>
          {!loggedIn ? <WelcomeButton text="Login" onPress={() => navigation.navigate('Login')} /> : <WelcomeButton text="Logout" onPress={this.logout.bind(this)} />}
          <WelcomeButton text="About" onPress={() => navigation.navigate('About')} />
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
    if (hour >= 5 && hour < 12) return `Good Morning ${user.displayName}`;
    else if (hour >= 12 && hour <= 17) return `Good Afternoon ${user.displayName}`;
    else return `Good Evening ${user.displayName}`;
  }
}

const WelcomeButton = (props) => {
  const colors = ['red', 'purple', 'blue']
  return (
    <TouchableOpacity style={styles.btn} onPress={props.onPress}>
      <LinearGradient style={styles.gradient} colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <Text style={styles.btnText}>{props.text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
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
  btn: {
    width: 220,
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 40,
    marginBottom: 4,
    marginTop: 4,
  },
  btnText: {
    fontSize: 25,
    color: '#f5f5f5',
  },
  gradient: {
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
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