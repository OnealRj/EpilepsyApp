import firebase from '../Firebase/fire.js';
import React from 'react';
import {useState} from "react";
import { ImageBackground, StyleSheet, 
        View, Image, Text, 
        TouchableOpacity, TextInput, 
        SafeAreaView, Button, onChangeText,onChangeNumber, ColorPropType} from 'react-native';
function SignInScreen({navigation}) 
{
    const[email,setEmail] = useState("")
    console.log(email)
    const[password,setPassword] = useState("")
    console.log(password)
    const[error, setError] = useState("")
    const signIn = async() => 
    {
        
        console.log("This is the firebase" + firebase.auth())
        firebase.auth().signInWithEmailAndPassword(email,password).then((
            userCredential) => {
                var user = userCredential.user
                console.log(user)
                navigation.navigate("WelcomeScreen")
                
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'WelcomeScreen' }],
                  });
                  
            })
            .catch((err) => {
            setError(err.message)
            console.log("this is the firebase object" + firebase.auth());
            });
    }
    return<>
        <ImageBackground
            style = {styles.background}
            source = {require("/Users/rjoneal/Desktop/LSAMP Research/firstPrototype/assets/Icons/SignInBackground.jpg")}> 
        <SafeAreaView>
            <TextInput
                style={styles.input}
                backgroundColor = "white"
                onChangeText = {email => setEmail(email)}
                placeholder = "Email"
                value={email}
                autoCapitalize = {"none"} />

            <TextInput
                style={styles.input}
                backgroundColor = "white"
                onChangeText = {password=> setPassword(password)}
                secureTextEntry = {true}
                value= {password}
                autoCapitalize = {"none"}
                placeholder="Password"
            />
            <TouchableOpacity
                style={styles.loginScreenButton}
                underlayColor='#fff'
                onPress ={() => signIn()}
                >
                <Text style={styles.loginText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.loginScreenButton}
                underlayColor='#fff'
                onPress ={() => navigation.navigate("MyProfile")}>
                <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity> 
            {
                error? <Text style = {{ color:"white" }}>{error}</Text>:null
            }
        </SafeAreaView>
     </ImageBackground>
    </>
}

const styles = StyleSheet.create(
{
    background: 
    { 
        flex: 1, 
        justifyContent: 'center',
        alignItems: "center",
    },
    input: 
    {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10,
        borderWidth: 1,
        borderRadius: 20, 
    },
    container: 
    {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: 
    {
        flex: 1,
        width: 300,
        height: 400,
    },
    loginScreenButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#add8e6',
        borderRadius:10,
        borderWidth: 1,
        borderColor: 'black'
      },
      loginText:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
});
export default SignInScreen;