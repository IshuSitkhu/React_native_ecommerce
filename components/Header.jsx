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
    paddingTop:35,
    borderRadius: 10,
  },
  title: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Header;