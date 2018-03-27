import React from 'react'
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native'

/** Change to Welcome. */
class Home extends React.Component {
    
    render() {
        return (
            <ImageBackground style={styles.container} source={require('../../assets/imgs/shooting-star.jpg')}>
                <Text style={[styles.text, {fontSize:40,fontWeight:'bold'}]}>Goal Tree</Text>
                <Text style={[styles.text, {fontSize:30, textAlign:'center'}]}>Welcome to the realization of your goals!</Text>
                <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>Login</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>Register</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>About</Text></TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        color: '#f5f5f5',
        textShadowColor: '#4d79ff',
        textShadowOffset: {width:3, height:3},
        textShadowRadius: 3,
    },
    btn: {
        width: 220,
        height: 30,
        backgroundColor: '#f5f5f5',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4d79ff',
        shadowOffset: {width:3, height:3},
        shadowRadius: 3,
        elevation: 10,
    },
    btnText: {
        fontSize: 20,
        fontFamily: 'san-serif-medium',
        color: '#4d79ff',
    },
})

export default Home