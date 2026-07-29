import { Pressable, Text, StyleSheet } from "react-native";

export default function CustomButton({ title, onPress , variant = "primary",}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4F46E5",
    padding: 15,
    borderRadius: 10,
    marginTop:20,
  },

  primary: {
    backgroundColor: "#4F46E5",
  },

  secondary: {
    backgroundColor: "#10B981",
  },

  danger: {
    backgroundColor: "#EF4444",
  },

  gray: {
    backgroundColor: "#6B7280",
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});