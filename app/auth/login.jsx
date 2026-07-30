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
import CustomToast from "../../components/CustomToast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

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

  setToast({
    visible: true,
    type: "success",
    message: "Login Successful!",
  });

  setTimeout(() => {
    setToast((prev) => ({
      ...prev,
      visible: false,
    }));

    router.replace("/");
  }, 2000);

} else {
  setToast({
    visible: true,
    type: "error",
    message: "Invalid username or password!",
  });

  setTimeout(() => {
    setToast((prev) => ({
      ...prev,
      visible: false,
    }));
  }, 2000);
}
    } catch (error) {
      console.log(error);

      setToast({
        visible: true,
        type: "error",
        message: "Login Failed!",
      });

      setTimeout(() => {
        setToast((prev) => ({
          ...prev,
          visible: false,
        }));
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <CustomToast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
        />
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
                color="#037a52"
                style={{ marginVertical: 10 }}
              />
            )}

            <CustomButton
              title="Login"
              onPress={handleLogin}
              variant="secondary"
            />

            <View style={styles.arrange}>
              <CustomButton
                title="Not Register yet? Register Now!"
                onPress={() => router.push("/auth/register")}
                variant="gray"
              />

              <CustomButton
                title="← Back"
                onPress={() => router.replace("/")}
              />
            </View>
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
  arrange:{ 
    width:"100%", 
    flexDirection:"row", 
    justifyContent: "space-between",
  },
});