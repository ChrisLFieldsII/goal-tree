import React from 'react'
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

class Welcome extends React.Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={require('../../assets/imgs/shooting-star.jpg')}>
        <Text style={[styles.text, { fontSize: 40, fontWeight: 'bold', marginTop: 10 }]}>Goal Tree</Text>
        <Text style={[styles.text, { fontSize: 30, textAlign: 'center', }]}>Welcome to the realization of your goals!</Text>
        <View style={{ flex: 2 }}>
          <WelcomeButton text="Login" navTo="login" {...this.props} />
          <WelcomeButton text="About" navTo="about" {...this.props} />
        </View>
      </ImageBackground>
    )
  }
}

const WelcomeButton = (props) => {
  console.log(props)
  const { navigate } = props.navigation
  const colors = ['red', 'purple', 'blue']
  return (
    <TouchableOpacity style={styles.btn} onPress={() => navigate(props.navTo)}>
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
})

export default Welcome