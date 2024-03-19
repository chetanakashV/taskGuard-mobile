import React, {useEffect} from "react";
import { View , Text, Alert} from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
import messaging from '@react-native-firebase/messaging'





const GuardHome = ({ route}) => {

    const requestUserPermission = async () =>{
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
    }

    const {userName} = route.params; 
    const {addUser} = route.params;

    useEffect( () => {

            if(requestUserPermission()){
                messaging().getToken().then(token => {
                    console.log(token); 
                    addUser(userName, token); 
                })
            }
            else {
                console.log("failed token status", authStatus); 
            }

            messaging().getInitialNotification().then( async (remoteMessage) => {
                if(remoteMessage) {
                    console.log( 
                        'Notification caused the app to open from quit state: ', 
                        remoteMessage.data,
                    ); 
                }
            }); 

            messaging().onNotificationOpenedApp( async (remoteMessage) => {
                console.log(
                    'Notification caused the app to open from background state: ',
                    remoteMessage.data,
                );
            });

            messaging().setBackgroundMessageHandler(async (remoteMessage) => {
                console.log('Message Handled in the background', remoteMessage)
            });

            const unsubscribe = messaging().onMessage(async remoteMessage => {
                Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
            }); 

            return unsubscribe; 
    }, [])

   

    return(
        <View>
            <Text> Welcome Guard, {userName} </Text>
        </View>
    )


}

export default GuardHome; 