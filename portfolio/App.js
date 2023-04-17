// phone number formatting code reference: https://www.youtube.com/watch?v=MqJzsDC1N0U&t=128s 

import { StyleSheet, Text, View, FlatList, TextInput, Button, CheckBox } from "react-native";
import { useState, useEffect, useCallback } from "react";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from '@rneui/themed';
import ToDoPage from "./components/ToDoPage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";


const Stack = createNativeStackNavigator();

export default function App() {

  // AsyncLocalStorage should update this
  let testLoginData = [
    { username: 'test', password: 'Test1@', key: 1 },
  ];
  useEffect(() => {
    async function storeData() {

      // get the existing login data from AsyncStorage
      const loginData = await AsyncStorage.getItem('loginData');
      // if there is no login data, initialize it with testLoginData
      if (!loginData) {
        await AsyncStorage.setItem('loginData', JSON.stringify(testLoginData));
      }
    }
    storeData()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="ToDo" component={ToDoPage} options={{ title: 'ToDo Page' }} />
        <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Login Page' }} />
        <Stack.Screen name="Registration" component={RegistrationPage} options={{ title: 'Registration Page' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}