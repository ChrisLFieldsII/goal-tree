import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import firebase from 'react-native-firebase';
import { onPermissionsMissing } from "./FBLoginUtils";
import { connect } from "react-redux";
import { loggedIn } from "../../redux/actions";
import t from "tcomb-form-native";

// tcomb-form-native set-up
const Form = t.form.Form;
const User = t.struct({
  email: t.String,
  password: t.String
})

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  static navigationOptions = {
    title: 'Login',
  };

  componentDidMount() {
    console.dir(this.props)
    const { navigate } = this.props.navigation;
    GoogleSignin.hasPlayServices({ autoResolve: true })
      .then(() => {
        console.log('Play svcs available.');
        this.authSubscription = firebase.auth().onAuthStateChanged(user => {
            console.log('====================================')
            console.log('on auth state changed');            
            // change redux state. determines which screen shows
            if (user) { // user is signed in
              console.log(user);
              console.log('redirecting...'); 
              this.props.dispatchLoggedIn(user);
              //navigate('dashboard'); //TODO: naviate to dashboard 
            }
            else { // user not signed in
              console.log('no user signed in');
              this.setState({loading:false,});
            }
            console.log('====================================')
        });
      })
      .catch(() => {
        // disable gsignin btn or whole app?!
        console.error('Play svcs error.')
      });
  }

  componentWillUnmount() {
    this.authSubscription()
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <View style={{flex:1,alignItems:'center'}}>
          <Text style={styles.lwText}>Easy Login</Text>
          <GoogleSigninButton style={{ width: 312, height: 48 }} size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light} onPress={this.gSignin.bind(this)} />
          <View style={{ width: 308, height: 48 }}>
            <FBLogin style={{ paddingBottom: 30, borderRadius: 5 }} loginBehavior={FBLoginManager.LoginBehaviors.Native}
              permissions={['email', 'public_profile']} onPermissionsMissing={onPermissionsMissing}
              onLogin={this.onFBLogin.bind(this)} onLoginFound={e => console.log(e)} onLoginNotFound={e => console.log(e)}
              onLogout={e => console.log(e)} onCancel={e => console.log(e)} onError={e => console.error(e)} />
          </View>
        </View>

        <Text style={styles.lwText}>Regular Login</Text>
        <View style={{marginLeft:10,marginRight:10}}>
          <Form ref={form => this.form = form} type={User} />
        </View>
        <TouchableHighlight style={styles.btn} onPress={this.onFormSubmit.bind(this)}>
          <Text>Login with Email</Text>
        </TouchableHighlight>
        

        <TouchableHighlight style={styles.btn} onPress={() => navigate('register')}>
          <View style={{flex:1,justifyContent:'center'}}>
            <Text style={{textAlign:'center',color:'whitesmoke'}}>Register Account</Text>
          </View>
        </TouchableHighlight>

      </View>
    );
  }

  async gSignin() {
    try {      
      console.log('====================================');
      console.log(`clicked google sign in`);
      await GoogleSignin.configure({
        webClientId: '887176493284-hgljvct92hjn8q2hf5qjc12a4qdqqvfo.apps.googleusercontent.com',
      });
      const googleUser = await GoogleSignin.signIn();
      console.log(googleUser);
      const idToken = googleUser.idToken;
      const credential = await firebase.auth.GoogleAuthProvider.credential(idToken);
      console.log(credential);
      const firebaseUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      console.log(firebaseUser);      
      console.log('====================================');
    }
    catch (err) {
      console.error(err);
    }
  }

  async onFBLogin(e) {
    try {      
      console.log('====================================')
      console.log('FB LOGIN')
      console.log(e)
      const accessToken = e.credentials.token;
      const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
      const user = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      console.log(user);
      console.log('====================================')
    }
    catch (err) {
      console.error(err);
    }
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
    //alignItems: 'center'
  },
  lwText: {
    textAlign: 'left',
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

const mapDispatchToProps = dispatch => {
  return {
    dispatchLoggedIn: user => dispatch(loggedIn(user)),
  };
}

export default connect(null,mapDispatchToProps)(Login);