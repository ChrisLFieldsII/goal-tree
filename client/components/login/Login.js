import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import firebase from 'react-native-firebase';

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
        GoogleSignin.hasPlayServices({autoResolve:true})
            .then(() => {
                console.log('Play svcs available.');
                // this.authSubscription = firebase.auth().onAuthStateChanged(user => {
                //     // change redux state. determines which screen shows
                //     console.log(user);
                //     this.setState({loading:false,})
                // });
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
        return (
            <View style={styles.container}>
                <Text style={styles.lwText}>Easy Login</Text>
                <GoogleSigninButton style={{width:312,height:48}} size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light} onPress={this.gSignin.bind(this)} />
                <View style={{width:308,height:48}}>
                    <FBLogin style={{paddingBottom:30,borderRadius:5}} loginBehavior={FBLoginManager.LoginBehaviors.Native}
                        permissions={['email','public_profile']} onPermissionsMissing={e => console.log(e)}
                        onLogin={this.onFBLogin.bind(this)} onLoginFound={e => console.log(e)} onLoginNotFound={e => console.log(e)}
                        onLogout={e => console.log(e)} onCancel={e => console.log(e)} onError={e => console.error(e)} />
                </View>
            </View>
        );
    }

    gSignin() {
        console.log('clicked google login')
        GoogleSignin.configure({
            webClientId: '887176493284-hgljvct92hjn8q2hf5qjc12a4qdqqvfo.apps.googleusercontent.com',
        }).then(() => {
            GoogleSignin.signIn().then(user => {
                console.log('====================================')
                console.log(user)
                console.log('====================================')                
            }).catch(err => {
                console.error(err)
            })
        }).catch(err => {
            console.error(err);            
        })
    }

    onFBLogin(e) {
        console.log('====================================')
        console.log('fb login')
        console.log(e)
        console.log('====================================')
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    lwText: {
        textAlign: 'left',
        fontSize: 25,
        marginTop: 30,
    }
})

export default Login;