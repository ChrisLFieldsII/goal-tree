import React, { Component } from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { DrawerItems } from "react-navigation";
import { connect } from "react-redux";
import { loggedOut } from '../../redux/actions';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';
import AppBtn from '../general/AppBtn';


class CustomNav extends Component {

  componentDidMount() {
    console.log(this.props);
  }
  

  render() {
    const { loggedIn, items } = this.props;
    return (
      <ImageBackground style={{flex:1,alignItems:'center'}} source={require('../../assets/imgs/shooting-star.jpg')}>
        <ScrollView style={{flex:1}}>
          <SafeAreaView style={{flex:1}}>
              <DrawerItems {...this.props}
                getLabel={scene => <AppBtn margin={10} fontSize={16} height={35} onPress={() => this.props.navigation.navigate(this.props.getLabel(scene))} text={this.props.getLabel(scene)} />}
                items={this.getDrawerItems()}
              />
              {loggedIn ? <LogoutBtn {...this.props} /> : null}
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    );
  }

  getDrawerItems() {
    const { loggedIn, items } = this.props;
    // values in arrays WILL NOT be shown in drawer
    if (!loggedIn) return items.filter(item => !['SetGoal','ViewGoals'].includes(item.key));
    else return items.filter(item => !['SetGoal','ViewGoals','Login'].includes(item.key));
  }
}

const LogoutBtn = props => {
  console.log(props)

  const logout = async () => {
    console.log('pressed logout')
    props.navigation.navigate('Welcome'); // must nav to Welcome before dispatching logout or else null error
    props.dispatchLoggedOut();
    await firebase.auth().signOut();
    console.log('user signed out')
  }

  return (
    <View style={{alignItems:'center', marginTop:50}}>
      <Text style={{color:'white',fontWeight:'bold'}}>You are logged in.</Text>
      <AppBtn margin={10} fontSize={16} height={40} onPress={logout} text="Logout" />
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