import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import CustomToast from "../components/CustomToast";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Search() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );

      const data = await response.json();
      console.log(data);

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${encodeURIComponent(
          category
        )}`
      );

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
  console.log(categories);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomToast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
      />

      <View style={styles.container}>
        <Header title="Search Product" />
        <View style={styles.pickerContainer}>
        <Picker
            
            selectedValue={selectedCategory}
            onValueChange={(value) => {
            setSelectedCategory(value);

            if (value) {
                fetchProductsByCategory(value);
            } else {
                setProducts([]);
            }
            }}
        >
            <Picker.Item
            label="Select a Category"
            value=""
            />

            {categories.map((item) => (
            <Picker.Item
                key={item}
                label={item}
                value={item}
            />
            ))}
        </Picker>
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
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text>No products found.</Text>
            </View>
          }
        />

        <Navbar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "#fff",
    marginVertical: 15,
    height: 50,
    justifyContent: "center",
    overflow: "hidden",
    },

    emptyContainer: {
        alignItems: "center",
        marginTop: 30,
        fontSize: 18,
    },
});