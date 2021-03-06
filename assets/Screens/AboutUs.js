import React from 'react';
import { useState } from 'react';
import { ImageBackground, StyleSheet, 
    View, Image, Text, 
    TouchableOpacity, TextInput, 
    SafeAreaView, Button, onChangeText,onChangeNumber, ColorPropType,ScrollView} from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons'
import firebase from '../Firebase/fire';

function editMyProfile()
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
        if (snapshot.exists())
        {
            setFirstName(snapshot.val().firstName);
            setLastName(snapshot.val().lastName);
            setEmail(snapshot.val().email);
            // figure out what is going on with the setPhone hook! 
            setPhone(snapshot.val().phoneNumber);
            setEmergencyContact(snapshot.val().emergencyContact);
            setInstructions(snapshot.val().emergencyCareInstructions);
        } 
        else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    return(
        <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleBar}>
                <Ionicons name="ios-arrow-back" size={10} color="#52575D"> </Ionicons>
            </View>

            <View style={{alignSelf: "center" }}>
                <View style={styles.profileImage}>
                    <Image source={require("/Users/rjoneal/Desktop/LSAMP Research/firstPrototype/assets/Icons/bigflex.jpg")} style={styles.image} resizeMode="center"></Image>
                </View>
                <View style={styles.dm}>
                    <MaterialIcons name="chat" size={18} color="#e6bbad"></MaterialIcons>
                </View>
                <View style={styles.active}></View>
                <View style={styles.add}>
                    <Ionicons name="ios-add" size={48} color="#e6bbad" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontWeight: "Bold", fontSize: 36 }]}>{firstName + " " + lastName} </Text>
            </View>
                <View style={styles.DataContainer}>
                        <Text  style = {styles.DataItem} category = "h4" > {"Email: " + email} </Text>
                </View>
                <View style={styles.DataContainer}>
                        <Text style = {styles.DataItem} category = "h4" > {"Phone Number: " + phoneNumber} </Text>
                </View>
                <View style={styles.DataContainer}>
                        <Text style = {styles.DataItem} category = "h4" > {"Emergency Contact: " + emergencyContact} </Text>
                </View>
                <View style={styles.DataContainer}>
                        <Text style = {styles.DataItem} category = "h5" > {"Emergency Care Information: " + myInstructions} </Text>
                </View>
            <Text style={[styles.subText, styles.recent]}>Recent Activity: </Text>
            <View style={{ alignItems: "center" }}>
                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                            You have messages from <Text style={{ fontWeight: "400" }}> Dr. Shih</Text> and <Text style={{ fontWeight: "400" }}> Mom</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                            You recently <Text style={{ fontWeight: "400" }}>created a log</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    background: 
    { 
        flex: 1, 
        justifyContent: 'center',
        alignItems: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#ade6d8"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {

        alignSelf: "center",
        alignItems: "center",
        marginTop: 16,
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }, 
    DataContainer:
    {
        backgroundColor: "#adbce6",
        fontSize: 20
    },
    DataItem: 
    {
       marginVertical: 4,
       color: "black",
    },
});
export default editMyProfile;
