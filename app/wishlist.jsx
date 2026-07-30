import { View, Text, FlatList, Image, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useWishlist } from "../context/WishlistContext";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function Wishlist() {
  const { wishlist, addToWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header title="My Wishlist" />

          <Text style={styles.empty}>
            Your wishlist is empty.
          </Text>
        </View>
        <Navbar />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header title="My Wishlist" />

        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="contain"
              />

              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>
                  {item.title}
                </Text>

                <View style={styles.arrange}>
                  <Text style={styles.price}>
                    £{item.price}
                  </Text>

                  <Pressable
                    style={styles.removeButton}
                    onPress={() => addToWishlist(item)}
                  >
                    <Ionicons
                      name="heart"
                      size={28}
                      color="#dc143c"
                    />
                  </Pressable>
                </View>
          

                
              </View>
            </View>
          )}
        />

        {/* <CustomButton
          title="<- Go Shopping"
          onPress={() => router.replace("/")}
        /> */}

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

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  empty: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 30,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
    marginVertical: 15,
  },

  image: {
    width: 80,
    height: 80,
    marginRight: 15,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  price: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },

  removeButton: {
    alignSelf: "flex-start",
    marginRight: 15,
    
  },
  arrange:{
    width:"100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  }
});