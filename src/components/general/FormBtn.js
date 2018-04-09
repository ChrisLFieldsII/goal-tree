import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class FormBtn extends Component {
  
  render() {
    const { text, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <View style={{flex:1,justifyContent:'center'}}>
            <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    width:308,
    height:40,
    backgroundColor:'#009688',
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    color: 'whitesmoke',
  },
})

export default FormBtn;