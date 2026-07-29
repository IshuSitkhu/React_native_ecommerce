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
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://fakestoreapi.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.token) {
        setUsername("");
        setPassword("");
        Toast.show({
          type: "success",
          text1: "Login Successful!",
          text2: "Redirecting to HomePage...",
        });
  
        setTimeout(() => {
          router.replace("/");
        }, 1500);
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <Header title="Login" />

            <Text style={styles.title}>
              Welcome Back
            </Text>

            <CustomInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
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
              title="Login"
              onPress={handleLogin}
              variant="secondary"
            />

            <CustomButton
              title="Not registered yet? Register Now!"
              onPress={() => router.push("/auth/register")}
              variant="primary"
            />

            {/* <CustomButton
              title="← Back"
              onPress={() => router.replace("/")}
            /> */}
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