import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { router } from "expo-router";

import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import CustomButton from "../components/CustomButton";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart , cart} = useCart();

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://fakestoreapi.com/products"
      );

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
        <ActivityIndicator size="large" color="blue" />
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

  return (
    <View style={styles.container}>
      <Header title="Product Store" />
      <Text style={styles.title}>Welcome to Product Store</Text>

      <CustomButton
        title="Open Cart"
        onPress={() => router.push("/cart")}
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            price={item.price}
            image={item.image}
            onPress={() => router.push(`/product/${item.id}`)}
            onAddToCart={() => addToCart(item)}
          />
        )}
      />
    </View>
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
    marginVertical: 20,
    textAlign: "center",
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
});