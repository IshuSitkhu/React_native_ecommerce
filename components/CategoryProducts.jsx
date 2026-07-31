import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import ProductCard from "./ProductCard";
import CustomToast from "./CustomToast";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function CategoryProducts({
  category,
  onBack,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://fakestoreapi.com/products/category/${encodeURIComponent(
          category
        )}`
      );

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

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
    const isWishlisted = wishlist.some(
      (item) => item.id === product.id
    );

    addToWishlist(product);

    setToast({
      visible: true,
      type: "success",
      message: isWishlisted
        ? "Removed from wishlist"
        : "Added to wishlist!",
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        visible: false,
      }));
    }, 2000);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#037a52"
        />
      </View>
    );
  }

  return (
    <>
      <CustomToast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
      />

      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Ionicons
            name="arrow-back"
            size={28}
            color="#012e1f"
          />
        </Pressable>

        <Text style={styles.title}>
          {category}
        </Text>
      </View>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
            <View style={{ flex: 1, margin: 5 }}>
                <ProductCard
                    title={item.title}
                    price={item.price}
                    image={item.image}
                    onPress={() =>
                    router.push(`/product/${item.id}`)
                    }
                    onAddToCart={() =>
                    handleAddToCart(item)
                    }
                    onToggleWishlist={() =>
                    handleWishlist(item)
                    }
                    isWishlisted={wishlist.some(
                    (wishItem) => wishItem.id === item.id
                    )}
                    isInCart={cart.some(
                    (cartItem) => cartItem.id === item.id
                    )}
                />
            </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 12,
    marginTop:12,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#012e1f",
    textTransform: "capitalize",
  },
});