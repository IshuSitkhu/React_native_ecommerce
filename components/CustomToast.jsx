import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CustomToast({
  visible,
  message,
  type = "success",
}) {
  if (!visible) return null;

  const isSuccess = type === "success";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isSuccess ? "#4CAF50" : "#E53935",
        },
      ]}
    >
      <Ionicons
        name={isSuccess ? "checkmark-circle" : "close-circle"}
        size={26}
        color="white"
      />

      <Text style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,

    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 16,
    paddingHorizontal: 18,

    borderRadius: 12,

    elevation: 8,
    zIndex: 999,
  },

  message: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 12,
    flex: 1,
  },
});