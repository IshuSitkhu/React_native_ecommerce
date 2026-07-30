import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop:25,
    borderRadius: 10,
  },
  title: {
    color: Colors.text,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
  },
});

export default Header;