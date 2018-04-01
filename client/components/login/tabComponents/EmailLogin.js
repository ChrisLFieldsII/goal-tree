import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { loggedIn } from "../../../redux/actions";
import t from "tcomb-form-native";


// tcomb-form-native set-up
const Form = t.form.Form;
const User = t.struct({
  email: t.String,
  password: t.String
})
const tOptions = {
  fields: {
    email: {
      placeholder: 'Please enter your valid email.',
      error: 'Please enter a valid email.'
    },
    password: {
      placeholder: 'Please enter your password.',
      error: 'Please enter your password.',
      password: true,
      secureTextEntry: true,
    }
  }
}

class EmailLogin extends Component {

  static navigationOptions = {
    title: 'Email Login',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Email Login</Text>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Form ref={form => this.form = form} type={User} options={tOptions} />
        </View>
        <View style={{flex:1,alignItems:'center'}}>
          <TouchableOpacity style={styles.btn} onPress={this.onFormSubmit.bind(this)}>
          <View style={{flex:1,justifyContent:'center'}}>
              <Text style={{textAlign:'center',color:'whitesmoke'}}>Login with Email</Text>
          </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onFormSubmit() {
    const user = this.form.getValue();
    if (user) { // if validation fails, user will be null
      console.log(user)
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

export default EmailLogin;
