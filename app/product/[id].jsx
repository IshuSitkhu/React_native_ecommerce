import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import CustomButton from "../../components/CustomButton";
import Colors from "../../constants/Colors";
import Header from "../../components/Header";
import { useWishlist } from "../../context/WishlistContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import DragToCart from "../../components/DragToCart";
import { useCart } from "../../context/CartContext";
import CustomToast from "../../components/CustomToast";


export default function ProductDetail() {

  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { wishlist, addToWishlist } = useWishlist();
  const { addToCart, cart } = useCart();
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://fakestoreapi.com/products/${id}`
      );

      const data = await response.json();

      setProduct(data);

      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
}

if (error) {
  return (
    <View style={styles.loader}>
      <Text>{error}</Text>
    </View>
  );
}

const isWishlisted = wishlist.find(
  (item) => item.id === product.id
);

  const handleAddToCart = (product) => {
    addToCart(product);

    setToast({
      visible: true,
      type: "success",
      message: `${product.title} added to cart!`,
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        visible: false,
      }));
    }, 2000);
  };

  const isInCart = cart.some(
  (item) => item.id === product.id
);

return (
  <>
    <SafeAreaView style={{flex:1}}>      
      <View style={styles.container}>      
        <View style={{flexDirection:"row", justifyContent:"space-around"}}>
          <Header title="Product Description" />
          {/* <CustomButton
            title="← Back"
            onPress={() => router.replace("/")}
            // onPress={() => router.back()}
            variant="secondary"
          /> */}
        </View>
        <View style={styles.arrange}>
          <Text style={styles.title}>
            {product.title}
          </Text>

          <View style={styles.topRow}>
            <Pressable
              onPress={() => addToWishlist(product)}
              style={[
                styles.wishlist,
                isWishlisted && styles.wishlisted,
              ]}
            >
              <Ionicons
                name={isWishlisted ? "heart" : "heart-outline"}
                size={28}
                color={isWishlisted ? "#dc143c" : "black"}
              />
            </Pressable>
            <Text style={styles.price}>
              £{product.price}
            </Text>
            
          </View>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.category}>
            {product.category}
          </Text>
          <Text style={styles.description}>
            {product.description}
          </Text>         
        </View>
         
      </View>
      <DragToCart
        onAddToCart={() => handleAddToCart(product)}
        isInCart={isInCart}
      />
      <CustomToast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
      />
    </SafeAreaView>
  </>

);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  arrange: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    paddingTop:20,
    color:"#43464a",
  },
  image: {
    width: "100%",
    height: 320,
    paddingTop:20,
  },

  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
    marginVertical: 10,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
  },

  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  wishlist: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "transparent",
  },

  wishlisted: {
    color: "#dc143c",
  },

  category: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text,
    marginVertical:5,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});