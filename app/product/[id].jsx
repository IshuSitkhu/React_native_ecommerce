import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import CustomButton from "../../components/CustomButton";
import Colors from "../../constants/Colors";
import Header from "../../components/Header";

export default function ProductDetail() {

  const { id } = useLocalSearchParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

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

return (
  <View style={styles.container}>
    <Header title="Product Description" />

    <Text style={styles.category}>
      {product.category}
    </Text>
    <Image
      source={{ uri: product.image }}
      style={styles.image}
      resizeMode="contain"
    />
    

    <Text style={styles.title}>
      {product.title}
    </Text>

    <Text style={styles.price}>
      £{product.price}
    </Text>

    <Text style={styles.description}>
      {product.description}
    </Text>

    <CustomButton
      title="← Back"
      onPress={() => router.replace("/")}
      // onPress={() => router.back()}
    />

  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop:10,
  },
  image: {
    width: "100%",
    height: 250,
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
    marginBottom: 20,
  },

  category:{
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text,
    margin: 10,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});