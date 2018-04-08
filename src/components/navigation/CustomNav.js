import React, { Component } from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { DrawerItems } from "react-navigation";
import { connect } from "react-redux";
import { loggedOut } from '../../redux/actions';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';



class CustomNav extends Component {

  componentDidMount() {
    console.log(this.props);
  }
  

  render() {
    const { loggedIn } = this.props;
    return (
      <ImageBackground style={{flex:1,alignItems:'center'}} source={require('../../assets/imgs/shooting-star.jpg')}>
        <ScrollView style={{flex:1}}>
          <SafeAreaView style={{flex:1}}>
              <DrawerItems {...this.props}
                getLabel={scene => (
                  <TouchableOpacity style={styles.drawerBtn} onPress={() => this.props.navigation.navigate(this.props.getLabel(scene))}>
                    <LinearGradient style={styles.gradient} colors={['red', 'purple', 'blue']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                      <Text style={{color:'white'}}>{this.props.getLabel(scene)}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              />
              {loggedIn ? <LogoutBtn {...this.props} /> : null}
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const LogoutBtn = props => {
  console.log(props)

  const logout = async () => {
    console.log('pressed logout')
    props.dispatchLoggedOut();
    await firebase.auth().signOut();
    props.navigation.navigate('Welcome');
    console.log('user signed out')
  }

  return (
    <View style={{alignItems:'center', marginTop:50}}>
      <Text style={{color:'white'}}>You are logged in.</Text>
      <TouchableOpacity style={styles.drawerBtn} onPress={logout}>
        <LinearGradient style={styles.gradient} colors={['red', 'purple', 'blue']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Text style={{color:'white'}}>Logout</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerBtn: {
    width: 220,
    backgroundColor: 'transparent',
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 10,
  },
  gradient: {
    borderRadius: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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

export default connect(mapStateToProps,mapDispatchToProps)(CustomNav);