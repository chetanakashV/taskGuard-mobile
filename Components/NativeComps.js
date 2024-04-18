import React, {useState, useEffect} from "react";
import { View , Text, Button, StyleSheet,FlatList, Pressable, TextInput, Alert} from "react-native";
// import { Clipboard } from "@react-native-clipboard/clipboard";
import * as Clipboard from 'expo-clipboard';
import { openURL} from 'expo-linking'
import { useNavigation } from '@react-navigation/native';

const NativeComps = () => {
    const [copiedText, setCopiedText] = React.useState('')
    const [inputText, setInputText] = React.useState(''); 

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(inputText);
  };

  const sendMail = () =>{
    openURL("mailto:chetanakash1234@gmail.com")
  }

  const openWebsite = () =>{
    openURL('https://www.google.com')
  }

  const callPerson = () =>{
    openURL("tel:8143229101")
  }

  const sendMessage = () =>{
    openURL("sms:8143229101")
  }

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  const navigation = useNavigation(); 

  const goToPage = () =>{
    navigation.navigate("home")
}

    return (
        <View>
            <TextInput
            style={styles.input}
            onChangeText={setInputText}
             /> 

            {Clipboard.isPasteButtonAvailable && <Text> Available </Text>}

             <Text>{inputText}</Text>
            <Button title="Click here to copy to Clipboard" onPress={copyToClipboard} />
            <Button title="View copied text" onPress={fetchCopiedText} />
            <Text style={styles.copiedText}>{copiedText}</Text>
            <Button title = "Go to google" onPress={openWebsite}></Button>
            <Button title = "Send Mail" onPress = {sendMail}></Button>
            <Button title = "Call Person" onPress = {callPerson}></Button>
            <Button title = "Send SMS" onPress = {sendMessage}></Button>
            <Button title = "Go To push notifications" onPress = {goToPage}></Button>
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    copiedText: {
      marginTop: 10,
      color: 'red',
    },
  });

export default NativeComps;  