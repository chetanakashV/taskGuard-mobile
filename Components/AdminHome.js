import React, {useState, useEffect} from "react";
import { View , Text, Button, StyleSheet,FlatList, Pressable, TextInput, Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDocs, collection, query, where} from "firebase/firestore"
import { CheckBox } from "@react-native-community/checkbox";

// var users = []; 
var tempTitle = "this is test title"; 


const AdminHome = ({route}) => {

    
    
    const [title, setTitle] = useState(""); 
    const [message, setMessage] = useState("");
    const {db} = route.params;  
    const [users, setUsers] = useState([]); 
    const [newTitle, setNewTitle] = useState("New Task");
    const [newMessage, setNewMessage] = useState("You have been assigned a new task")
    var nn = "temp2" 

    const [selectedUsers, setSelectedusers] = useState([]);

    const getUsers =  async () =>{
    
      console.log("working"); 

      const getData = async () =>{
    
        const data = await getDocs(collection(db, "users")); 
    
      // console.log(data) ;
    setUsers([]); 
      // data.docs.map((doc) => {setUsers( (prevUsers) => [...prevUsers, doc.id]) })
      data.docs.map((doc) => {setUsers((prevUsers) => [...prevUsers, [doc.id, doc.data().name]])})
    }
    
    getData(); 
      
    console.log(users);
    
  }

  const selectUser = (item) =>{
      if(selectedUsers.some(val => val[0] === item[0])){Alert.alert("user already added")}

      else  setSelectedusers((prevItems) =>[...prevItems, item])
  }

  const deselectUser = (item ) =>{
    setSelectedusers(l => l.filter(val => item[0] !== val[0]))
  }


  const sendMessages = () =>{
      selectedUsers.map((item)=>{
        sendMessage(item[0], newTitle, newMessage)

      })
  }



    const sendMessage = (fcmKey,title,message) =>{
      //  console.log(`${message}`)
      const apiKey = 'AAAA49LMuFs:APA91bG0JEGIEJCkSSUIrdpJZYAYvNCTGFnYj6J_5AZtvBjDu35f4XIaq6geM7Rww0kFJBK15CtsDWwvrEpUhQxZYMDyMQLiP5JXQkMfcZGl1CpVoN_dIlt5DZf7v_Ba7d0pvrbCc6mA';

       fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
              'Authorization': `key=${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: fcmKey,
              notification: {
                title : title,
                body: message,
              },
              priority: 'high', // Set priority to ensure timely delivery (optional)
            }),
          });
    }

    return(
        <View>
            <Text>{"\n"}{"\n"}{"\n"}</Text>
            {/* <Text> Enter the Name of task</Text>
            <TextInput style = {styles.input} value = {title}  onChange={(newText) => setTitle(newText)}/>

            <Text> Enter the Description of task</Text>
            <TextInput style = {styles.input_big} value = {message} multiline = {true} onChange = {(newText) => setMessage(newText)}/> */}

            <Button
                title = "Send Message"
                color = "green"
                onPress = {sendMessages}
            />

            <Pressable onPress={ getUsers }>
              <Text style = {styles.refresh}> {"\n"} Refresh</Text>
            </Pressable>
        

           {/* <Pressable onPress = {() => {console.log(users)}}> <Text>Print Users</Text>
           </Pressable> */}

          

            <FlatList
                data={users}
                renderItem={({ item }) => <Text style = {styles.name} onPress={() => {selectUser(item)}}>  {item[1]} {'\n'}</Text>}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={() => (
                      <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold',textDecorationLine: 'underline' }}>
                            List of Users 
                      </Text>
                )}
     
            />
            <FlatList
                data={selectedUsers}
                renderItem={({ item }) => <Text style = {styles.name} onPress={() => {deselectUser(item)}}>  {item[1]} {'\n'}</Text>}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={() => (
                      <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold',textDecorationLine: 'underline' }}>
                            List of selectedUsers 
                      </Text>
                )}
     
            />


        </View>
    )


}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      textAlign: "center"
    },
    input_big: {
        height:100, 
        margin: 12, 
        borderWidth: 1, 
        padding: 10, 
        
    },
     label: {
        height: 40,
       
        padding: 10,
        textAlign: "center"
     }, 
     button: {
        width: "30px", 
        color: "red"
     }, 
     refresh: {
      textAlign: "center"
     }, 
     name: {
      textAlign: "center"
     }
  });

export default AdminHome; 