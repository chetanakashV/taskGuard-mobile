import React, {useState} from "react";
import { View, Text,TextInput, Button, Pressable, StyleSheet, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDocs, collection, query, where} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD0RhBjO9ZKRHP_gnLaT8zkyCYAj0f8Xqw",
  authDomain: "taskguard-a06f5.firebaseapp.com",
  projectId: "taskguard-a06f5",
  storageBucket: "taskguard-a06f5.appspot.com",
  messagingSenderId: "978494208091",
  appId: "1:978494208091:web:78f436a81d7dc756b2277e",
  measurementId: "G-M436DH2269"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

const addUser = async (user, token) =>{
 
  
  try{
    await setDoc( doc(db, "users", token), {
      name: user, 
      device: "android"
    }).then(() => Alert.alert("Token is updated")); 
  }
  catch(error) {
    Alert.alert(error); 
  }
  
  
} 


const Landing = () =>{
    const navigation = useNavigation(); 
    const [userName, setUserName] = useState(""); 
    const [users, setUsers] = useState([]); 

    const goToPage = () =>{
        if(userName == "Admin") navigation.navigate("admin",
         {db: db }); 
        else navigation.navigate("user", {userName: userName, addUser})
    }

    


    return (
        <View>
        <Text> Hello Guys {"\n"} </Text>
                <Text style = {styles.label}> Enter Your UserName</Text>
              <TextInput
                style = {styles.input}
                placeholder="Enter User Name"
                value = {userName}
                onChangeText = {setUserName}
              />

            <Button
                title = "Go"
                onPress={goToPage}
            />             

        </View>
    )

}; 

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      textAlign: "center"
    },
     label: {
        height: 40,
       
        padding: 10,
        textAlign: "center"
     }
  });

export default Landing; 