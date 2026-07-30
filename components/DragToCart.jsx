import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

export default function DragToCart() {
  return (
    <View style={styles.container}>
      <View style={styles.handle} />

      <Ionicons
        name="cart"
        size={34}
        color="#4F46E5"
      />

      <Text style={styles.title}>
        Drag Up to Add to Cart
      </Text>

      <Text style={styles.subtitle}>
        Swipe upward to quickly add this item
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 20,
    alignItems: "center",

    borderTopWidth: 1,
    borderColor: "#ddd",

    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },

  handle: {
    width: 50,
    height: 5,
    borderRadius: 10,
    backgroundColor: "#ccc",
    marginBottom: 15,
  },

  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: "#666",
  },
});