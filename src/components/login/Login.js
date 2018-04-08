import React, { Component } from 'react'
import { TabNavigator } from 'react-navigation';
import EZLogin from './tabComponents/EZLogin';
import EmailLogin from './tabComponents/EmailLogin';
import Register from './tabComponents/Register';
import { connect } from "react-redux";
import { loggedIn } from "../../redux/actions";
import firebase from 'react-native-firebase';

class Login extends Component {

  componentDidMount() {
    console.log('login mounted');
    const { navigate } = this.props.navigation;
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      console.log('====================================')
      console.log('on auth state changed');            
      // change redux state. determines which screen shows
      if (user) { // user is signed in
        console.log(user);
        console.log('redirecting...'); 
        this.props.dispatchLoggedIn(user);
        navigate('Dashboard'); //TODO: naviate to dashboard 
      }
      else { // user not signed in
        console.log('no user signed in');
        //this.setState({loading:false,}); //TODO: add loading state
      }
      console.log('====================================')
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    return (
      <TabNav />
    );
  }
  
}

const TabNav = TabNavigator({
  EZ_Login: {
    screen: EZLogin
  },
  Regular_Login: {
    screen: EmailLogin
  },
  Register: {
    screen: Register
  },
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchLoggedIn: user => dispatch(loggedIn(user)),
  };
}

export default connect(null,mapDispatchToProps)(Login);