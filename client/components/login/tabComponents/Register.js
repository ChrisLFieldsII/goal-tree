import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";


class Register extends Component {

  static navigationOptions = {
    title: 'Register',
  };


  render() {
    return (
      <View>
        <Text style={styles.text}>Register</Text>
        <TouchableHighlight style={styles.btn} onPress={() => navigate('register')}>
          <View style={{flex:1,justifyContent:'center'}}>
            <Text style={{textAlign:'center',color:'whitesmoke'}}>Register Account</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: 30,
  },
  btn: {
    width:308,
    height:40,
    backgroundColor:'teal',
    borderRadius: 5,
  }
})

export default Register;