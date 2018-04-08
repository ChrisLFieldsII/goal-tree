import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


class AppBtn extends Component {

  render() {
    const { margin, fontSize, onPress, text, height } = this.props;
    const colors = ['red', 'purple', 'blue']
    return (
      <TouchableOpacity style={[styles.btn, {marginBottom:margin,marginTop:margin}]} onPress={onPress}>
        <LinearGradient style={[styles.gradient, {height}]} colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Text style={[styles.btnText, {fontSize}]}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    width: 220,
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 40,
  },
  btnText: {
    color: '#f5f5f5',
  },
  gradient: {
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AppBtn;