import { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, FlatList, TextInput, Button, CheckBox } from "react-native";
import { Input } from '@rneui/themed';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegistrationPage({ navigation }) {
    const handleRegister = async () => {
    // get the existing login data from AsyncStorage
    const loginData = await AsyncStorage.getItem('loginData');
    // create a new object with the username and password input values
    const newLoginData = { username: usernameInput, password: passwordInput, key: Date.now()};
    // if there is no login data, create a new array and add the new object
    if (!loginData) {
      const newLoginArray = [newLoginData];
      await AsyncStorage.setItem('loginData', JSON.stringify(newLoginArray));
    } else {
      // if there is existing login data, parse it and add the new object to the array
      const parsedLoginData = JSON.parse(loginData);
      parsedLoginData.push(newLoginData);
      await AsyncStorage.setItem('loginData', JSON.stringify(parsedLoginData));
    }
    // navigate to the login page
    navigation.navigate('Login');
    };
  
    const [phoneInput, setPhoneInput] = useState("");
    const [phoneError, setPhoneError] = useState("");
  
    const handleInput = (e) => {
      const formattedPhoneNumber = formatPhoneNumber(e.target.value);
      setPhoneInput(formattedPhoneNumber);
    };
    // formatting the phone number function
    function formatPhoneNumber(value) {
      if (!value) return value;
      const phoneNumber = value.replace(/[^\d]/g, "");
      if (phoneNumber.length < 4) return phoneNumber;
      if (phoneNumber.length < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
      }
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
      )}-${phoneNumber.slice(6, 10)}`;
    }
    // validating the phone number function
    let validatePhone = useCallback(() => {
      const phoneNumber = formatPhoneNumber(phoneInput);
      if (phoneNumber.replace(/[^\d]/g, "").length < 10) {
        setPhoneError("Error: Must include 10 numbers: (xxx) xxx-xxxx");
      } else {
        setPhoneError("");
      }
    }, [phoneInput]);
  
    const [emailInput, setEmailInput] = useState("");
    const [emailError, setEmailError] = useState("");
    // validating the email function
    let validateEmail = useCallback(() => {
      if (!/.+@.+\..{2,3}/.test(emailInput)) {
        setEmailError("Error: Make sure your email includes an @ and a '.'");
      } else {
        setEmailError("");
      }
    }, [emailInput]);
  
    // validating password and confirmed password
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordError, setPasswordError] = useState("");
  
    let validatePassword = useCallback(() => {
      if (
        !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{1,}$/.test(
          passwordInput
        )
      ) {
        setPasswordError(
          "Error: Musit include one uppercase, one lowercase, one digit, and one non-alphanumeric character."
        );
      } else {
        setPasswordError("");
      }
    }, [passwordInput]);
  
    const [checkedInput, setCheckedInput] = useState("");
    const [checkedError, setCheckedError] = useState("");
  
    let confirmPassword = useCallback(() => {
      if (checkedInput !== passwordInput) {
        setCheckedError("Error: This does not match the first password!");
      } else {
        setCheckedError("");
      }
    });
  
    // validating first and last name
    const [firstNInput, setFirstNInput] = useState("");
    const [firstNError, setFirstNError] = useState("");
    const [lastNInput, setLastNInput] = useState("");
    const [lastNError, setLastNError] = useState("");
  
    let validateFirstN = useCallback(() => {
      if (!/^[^\d=?\\/@#%^&*()]+$/.test(firstNInput)) {
        setFirstNError(
          "Error: Must only include word or symbol characters, no numbers."
        );
      } else {
        setFirstNError("");
      }
    });
  
    let validateLastN = useCallback(() => {
      if (!/^[^\d=?\\/@#%^&*()]+$/.test(lastNInput)) {
        setLastNError(
          "Error: Must only include word or symbol characters, no numbers."
        );
      } else {
        setLastNError("");
      }
    });
  
    const [zipInput, setZipInput] = useState("");
    const [zipError, setZipError] = useState("");
    // validating the zip code function
    let validateZip = useCallback(() => {
      if (!/^\d{5}$/.test(zipInput)) {
        setZipError("Error: Must be 5 digits.");
      } else {
        setZipError("");
      }
    }, [zipInput]);
  
    const [usernameInput, setUsernameInput] = useState("");
  
    // for newsletter checkbox
    const [checked, setChecked] = useState(false);
  
    // turn into if statement vvv
    const isButtonEnabled =
      firstNInput.length > 0 &&
      firstNError.length == "" &&
      lastNInput.length > 0 &&
      lastNError.length == "" &&
      usernameInput.length > 0 &&
      passwordInput.length > 0 &&
      passwordError.length == "" &&
      checkedInput.length > 0 &&
      checkedError.length == "" &&
      emailInput.length > 0 &&
      emailError.length == "" &&
      zipInput.length == 5 &&
      zipError.length == "";

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
        }
      });
      
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 600}}>
        <Text style={styles.header}>Registration Screen</Text>
        <Input
          style={styles.input}
          testID="firstname"
          placeholder="First Name"
          value={firstNInput}
          onBlur={validateFirstN}
          onChangeText={(text) => setFirstNInput(text)}
          errorMessage={firstNError}
        />
        <Input
          style={styles.input}
          testID="lastname"
          placeholder="Last Name"
          value={lastNInput}
          onBlur={validateLastN}
          onChangeText={setLastNInput}
          errorMessage={lastNError}
        />
        <Input
          style={styles.input}
          testID="username"
          placeholder="Username"
          value={usernameInput}
          onChangeText={setUsernameInput}
        />
        <Input
          style={styles.input}
          testID="phonenumber"
          placeholder="Phone Number"
          onChange={(e) => handleInput(e)}
          value={phoneInput}
          onBlur={validatePhone}
          errorMessage={phoneError}
        />
        <Input
          style={styles.input}
          testID="password"
          placeholder="Password"
          value={passwordInput}
          onBlur={validatePassword}
          onChangeText={setPasswordInput}
          errorMessage={passwordError}
        />
        <Input
          style={styles.input}
          testID="confirmpassword"
          placeholder="Confirm Password"
          value={checkedInput}
          onBlur={confirmPassword}
          onChangeText={setCheckedInput}
          errorMessage={checkedError}
        />
        <Input
          style={styles.input}
          testID="email"
          placeholder="Email"
          value={emailInput}
          onBlur={validateEmail}
          onChangeText={setEmailInput}
          errorMessage={emailError}
        />
        <Input
          style={styles.input}
          testID="zip"
          placeholder="Zip Code"
          value={zipInput}
          onBlur={validateZip}
          onChangeText={setZipInput}
          errorMessage={zipError}
        />
        <View>
          <Text style={{ fontWeight: "bold", paddingVertical: 10 }}>Sign up for Newsletter</Text>
          <CheckBox
            testID="newsletter"
            value={checked}
            onValueChange={setChecked}
            style={{ alignSelf: "center" }}
          />
        </View>
        <View style={{paddingVertical: 20}}>
        <Button
          title="Register"
          onPress={handleRegister}
          disabled={!isButtonEnabled}
          testID="login-register"
        />
        </View>
      </View>
    );
  }