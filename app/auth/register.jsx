import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

import Header from "../../components/Header";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    // Validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password 
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://fakestoreapi.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            username,
            password,
            phone,
            name: {
              firstname: firstName,
              lastname: lastName,
            },
          }),
        }
      );

      const data = await response.json();
      console.log({
        firstName,
        lastName,
        email,
        username,
        password,
        phone,
      });

      console.log(data);

      // Clear the form
      setFirstName("");
      setLastName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setPhone("");

      Toast.show({
        type: "success",
        text1: "Registration Successful!",
        text2: "Redirecting to login...",
      });

      setTimeout(() => {
        router.replace("/auth/login");
      }, 1500);

    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Header title="Register" />

          <Text style={styles.title}>
            Create Account
          </Text>

          <CustomInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />

          <CustomInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />

          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <CustomInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          <CustomInput
            placeholder="Enter your Phone Number"
            value={phone}
            onChangeText={setPhone}
          />

          <CustomInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error && (
            <Text style={styles.error}>
              {error}
            </Text>
          )}

          {loading && (
            <ActivityIndicator
              size="large"
              color="blue"
              style={{ marginVertical: 10 }}
            />
          )}

          <CustomButton
            title="Register"
            onPress={handleRegister}
            variant="secondary"
          />

          <CustomButton
            title="<- Already have an account."
            onPress={() => router.push("/auth/login")}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
});