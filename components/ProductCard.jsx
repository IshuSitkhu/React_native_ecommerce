import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";

export default function ProductCard({title, price, image, onPress, onAddToCart}) 
{
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
        {/* contain-show without cropping */}
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      <Text style={styles.price}>£{price}</Text>

      <CustomButton
          title="Add to Cart"
          onPress={onAddToCart}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
  },

  pressed: {
    opacity: 0.8,
  },

  image: {
    width: "100%",
    height: 180,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },

  price: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
});