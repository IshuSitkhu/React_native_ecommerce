import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import CustomToast from "../components/CustomToast";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, cart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch("https://fakestoreapi.com/products");

      const data = await response.json();

      // FakeStore API returns an array
      setProducts(data);

      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#037a52" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

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

  const handleWishlist = (product) => {
    const isWishlisted = wishlist.some((item) => item.id === product.id);

    addToWishlist(product);

    setToast({
      visible: true,
      type: "success",
      message: isWishlisted ? "Removed from wishlist" : "Added to wishlist ",
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        visible: false,
      }));
    }, 2000);
  };


  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomToast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
        />
        <View style={styles.container}>
          <Header title="Product Store" />
          {/* <CustomButton title="Login" onPress={() => router.push("/auth/login")} variant="secondary"/> */}
          <Text style={styles.title}>Welcome to Product Store</Text>

          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard
                title={item.title}
                price={item.price}
                image={item.image}
                onPress={() => router.push(`/product/${item.id}`)}
                onAddToCart={() => handleAddToCart(item)}
                onToggleWishlist={() => handleWishlist(item)}
                isWishlisted={wishlist.some(
                  (product) => product.id === item.id,
                )}
                isInCart={cart.some(
                  (cartItem) => cartItem.id === item.id
                )}
              />
            )}
          />

          <Navbar />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
    color: "#037a52",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 18,
  },
  login: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  arrange: {
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});
