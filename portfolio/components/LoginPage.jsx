import { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, FlatList, TextInput, Button, CheckBox } from "react-native";
import { Input } from '@rneui/themed';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage ({ navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
      const handleLogin = async () => {
      // Handle login logic here
  
      // test login data is found in the App function
      
      // check if username and password exists in AsyncLocalStorage. 
      // (This is initially set up by the user if they put in their information in the registration page.) 
  
      const checkLoginData = await AsyncStorage.getItem('loginData');
      if (checkLoginData) {
        const parsedLoginData = JSON.parse(checkLoginData);
        const match = parsedLoginData.find(
          (data) => data.username === username && data.password === password
        );
        if (match) {
          navigation.navigate('ToDo');
        } else {
          alert('Error: Invalid login credentials.');
        }
      } else {
        alert('No login data found.');
      }
  
    };
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
        header: {
          fontSize: 20,
          fontWeight: "bold",
        },
        input: {
          height: 40,
          margin: 12,
          padding: 10,
          width: 100,
        }})

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 600}}>
        <Text style={styles.header}>Login Screen</Text>
        <Input
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        testID="login-username"
        />
        <Input
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        testID="login-password"
        />
        <View style={{paddingVertical: 10}}><Button title="Login" onPress={handleLogin} testID="login-button" /></View>
        <View><Button title="Register" onPress={() => navigation.navigate('Registration')} testID="login-register" /></View>
      </View>
    );
  }