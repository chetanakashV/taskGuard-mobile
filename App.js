import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import GuardHome from './Components/GuardHome';
import AdminHome from './Components/AdminHome';
import Landing from './Components/Landing';
import { AppRegistry } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NativeComps from './Components/NativeComps'

const Stack = createNativeStackNavigator();

// AppRegistry.registerComponent('main', () => Landing)

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
     <Stack.Screen name = "temp" component = {NativeComps} />
     <Stack.Screen name = "home" component = {Landing} />
     <Stack.Screen name = "user" component = {GuardHome} />
     <Stack.Screen name = "admin" component = {AdminHome} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
