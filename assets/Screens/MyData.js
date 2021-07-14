import React from 'react';
import firebase from '../Firebase/fire.js';
import { useState } from 'react';
import { ImageBackground, StyleSheet, 
    View, Image, Text, 
    TouchableOpacity, TextInput, 
    SafeAreaView, Button, onChangeText,onChangeNumber, ColorPropType, Label} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

function MyDataScreen()
{
    var userID = firebase.auth().currentUser;
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[phoneNumber, setPhone] = useState("");
    const[emergencyContact, setEmergencyContact] = useState("");
    const[myInstructions,setInstructions] = useState("");
    // maybe we could save additional data in our database to store different medical information like what is in the medical application

    console.log("This is the current user ID in the my data screen:" + userID.uid);
    console.log(firebase.database().ref());
    var dbRef = firebase.database().ref();

    dbRef.child("users/").child(userID.uid).get().then((snapshot) => {
        if (snapshot.exists()){
         setFirstName(snapshot.val().firstName);
         setLastName(snapshot.val().lastName);
         setEmail(snapshot.val().email);
         // figure out what is going on with the setPhone hook! 
         setPhone(snapshot.val().phoneNumber);
         setEmergencyContact(snapshot.val().emergencyContact);
         setInstructions(snapshot.val().emergencyCareInstructions);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    return(
        <View style = {{flex:1,backgroundColor: "#e8f4f8"}}>
            <Text style = {styles.title} category = "h1"> My Data</Text>
            <ScrollView>
              <View>
                <Text style = {styles.container}  category = "h4">{firstName + " "+lastName}</Text>
              </View>
              <View>
                <Text style = {styles.container} category = "h4"> {"Email: " + email}</Text>

              </View>
              <View>
                <Text style = {styles.container} category = "h4">{"Phone Number: " + phoneNumber}</Text>
              </View>
              <View>
                <Text style = {styles.container} category = "h4">{"Emergency Contact: " + emergencyContact}</Text>
              </View>
              <View>
                <Text style = {styles.container} category = "h5">{"My Personal Care information: \n" + myInstructions}</Text>
              </View>
            </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    background: 
    { 
        flex: 1, 
        justifyContent: 'center',
        alignItems: "center",
    },
    title:
    {
      textAlign: "center",
      marginTop: 50, 
      backgroundColor: "#add8e6",
      fontSize: 40,
      color: "#FFFFFF",
    },
    container:
    { 
       backgroundColor: "#adbce6", // this is the purple color sytle sheet
       fontSize: 40,
       color: "#FFFFFF",
       flex: 1,
    },
});
export default MyDataScreen;

