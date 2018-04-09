import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { loggedIn } from "../../../redux/actions";
import t from "tcomb-form-native";
import firebase from 'react-native-firebase';
import FormBtn from '../../general/FormBtn';

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

// TODO: Add forgot password, remember me?, 
class EmailLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMsgs: null,
      user: null,
    }
  }
  

  static navigationOptions = {
    title: 'Email Login',
  };

  render() {
    const { errorMsgs } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Email Login</Text>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Form ref={form => this.form = form} type={User} options={tOptions} />
        </View>
        {/* Display error msgs after form submission if any */}
        {errorMsgs ? errorMsgs.map(msg => <Text key={msg} style={{color:'red',textAlign:'center'}}>{msg}</Text>) : null}
        <View style={{flex:1,alignItems:'center'}}>
          <FormBtn onPress={this.onFormSubmit.bind(this)} text="Login with Email" />
        </View>
      </View>
    );
  }

  async onFormSubmit() {
    const user = this.form.getValue();
    if (user) { // if validation fails, user will be null
      console.log(user)
      this.setState({user});
      try {
        const errorMsgs = [];
        this.setState({errorMsgs});
        let firebaseUser = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(user.email, user.password);
        console.log(firebaseUser);
        this.props.dispatchLoggedIn(firebaseUser);
        this.props.navigation.navigate('Dashboard');
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

export default connect(null,mapDispatchToProps)(EmailLogin);
