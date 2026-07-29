import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProductCard({
  title,
  price,
  image,
  onPress,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
})
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
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />

      <Pressable
        onPress={onToggleWishlist}
        style={styles.wishlist}
      >
        <Ionicons
          name={isWishlisted ? "heart" : "heart-outline"}
          size={28}
          color={isWishlisted ? "#dc143c" : "black"}
        />
      </Pressable>
    </View>

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      <Text style={styles.price}>£{price}</Text>
      {/* <View style={styles.topRow}>
        <Text style={styles.price}>£{price}</Text>

        <Pressable onPress={onToggleWishlist}>
          <AntDesign
            name="heart"
            size={24}
            color={isWishlisted ? "#dc143c" : "#dcdcdc"}
          />
        </Pressable>
      </View> */}

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
  imageContainer: {
  position: "relative",
},

wishlist: {
  position: "absolute",
  top: 10,
  right: 10,
  backgroundColor: "transparent",
  padding: 8,
  borderRadius: 10,
  elevation: 3,
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
  
  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
});