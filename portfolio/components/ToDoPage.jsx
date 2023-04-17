import { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, FlatList, TextInput, Button, CheckBox } from "react-native";
import { Input } from '@rneui/themed';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ToDoPage() {
    let tasks = [
      {
        key: "1",
        completed: false,
        description: "make breakfast",
      },
      {
        key: "2",
        completed: false,
        description: "finish homework",
      },
      {
        key: "3",
        completed: true,
        description: "clean room",
      },
      {
        key: "4",
        completed: false,
        description: "organize desk",
      },
    ];
  
    const [array, setArray] = useState(tasks);
    const [name, setName] = useState("")
    const [newKey, setNewKey] = useState(5);
  
    // for checkbox:
    const [checked, setChecked] = useState(true);
    const toggleCheckbox = () => setChecked(!checked);
  
    let renderItem = ({ item }) => {
      return (
        <View
          style={[
            { textDecorationLine: item.completed ? "line-through" : "none" },
          ]}
        >
          <Text>{item.description}</Text>
        </View>
      );
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
        },
      
      });
    return (
      <View style={styles.container}>
        <Input style={styles.input}
        value={name}
        onChangeText={setName}
        ></Input>
        <Button title="Add" onPress={() => {
            setArray([...array, { key: newKey.toString(), completed: false, description: name }]);
            setName("");
            setNewKey(newKey + 1);
          }}></Button>
        <Text style={styles.header}>Tasks</Text>
        <FlatList
          data={array}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }