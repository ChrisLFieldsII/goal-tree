import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import t from "tcomb-form-native";
import firebase from 'react-native-firebase';
import { connect } from "react-redux";
import { loggedIn } from "../../../redux/actions";
import FormBtn from '../../general/FormBtn';

// tcomb-form-native set-up
const Form = t.form.Form;
const User = t.struct({
  email: t.String,
  password: t.String,
  password2: t.String,
})
const tOptions = {
  fields: {
    email: {
      placeholder: 'Please enter your valid email.',
      error: 'Please enter a valid email.'
    },
    password: {
      help: <Text style={{color:'blue',fontSize:14}}>Password must be 8 characters or longer.</Text>,
      placeholder: 'Please enter your password.',
      error: 'Please enter your password',
      password: true,
      secureTextEntry: true,
    },
    password2: {
      label: 'Re-Enter Password',
      placeholder: 'Please re-enter your password.',
      error: 'Please re-enter your password',
      password: true,
      secureTextEntry: true,
    }
  }
}

/* Start of class!!! */
class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMsgs: null,
      user: null,
    }
  }
  

  static navigationOptions = {
    title: 'Register',
  };


  render() {
    const { navigate } = this.props.navigation;
    const { errorMsgs } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Register</Text>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Form ref={form => this.form = form} type={User} options={tOptions} value={this.state.user} />
        </View>
        {/* Display error msgs after form submission if any */}
        {errorMsgs ? errorMsgs.map(msg => <Text key={msg} style={{color:'red',textAlign:'center'}}>{msg}</Text>) : null}
        <View style={{flex:1,alignItems:'center'}}>
          <FormBtn onPress={this.onFormSubmit.bind(this)} text="Register Account" />
        </View>
      </ScrollView>
    );
  }

  async onFormSubmit() {
    const user = this.form.getValue();
    if (user) { // if validation fails, user will be null
      console.log(user)
      this.setState({user});
      // handle any errors
      const errorMsgs = [];
      if (user.password.length < 8) errorMsgs.push('Password length is below 8 characters.');
      if (user.password !== user.password2) errorMsgs.push('Passwords do not match.');
      if (errorMsgs.length > 0) this.setState({errorMsgs});
      // register user
      try {
        if (user.password.length >= 8 && user.password===user.password2) {
          console.log('registering user');
          const errorMsgs = [];
          this.setState({errorMsgs});
          await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password);
          // login user and redirect to dashboard
          let firebaseUser = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(user.email, user.password);
          console.log(firebaseUser);        
          this.props.dispatchLoggedIn(firebaseUser);
          this.props.navigation.navigate('dashboard');
        }        
      }
      catch (err) {
        //console.error(err);
        const errorMsgs = [];
        errorMsgs.push(err.message);
        this.setState({errorMsgs});
      }
    }
    else {
      console.log('user was null. validation failed.')
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: 30,
  },
  btn: {
    width:308,
    height:40,
    backgroundColor:'#009688',
    borderRadius: 5,
  }
})

const mapDispatchToProps = dispatch => {
  return {
    dispatchLoggedIn: user => dispatch(loggedIn(user)),
  };
}

export default connect(null,mapDispatchToProps)(Register);