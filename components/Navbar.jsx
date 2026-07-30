import { View, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import CustomButton from "./CustomButton";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Navbar() {
  return (
    <View style={styles.container}>

      <Pressable onPress={() => router.replace("/")}>
        <Entypo name="home" size={34} color="black" />
      </Pressable>

      <Pressable onPress={() => router.replace("/cart")}>
        <AntDesign name="shopping-cart" size={34} color="black" />
      </Pressable>

      <Pressable onPress={() => router.replace("/wishlist")}>
        <FontAwesome name="heart" size={34} color="black" />
      </Pressable>

      <Pressable onPress={() => router.replace("/audio")}>
        <MaterialIcons name="audiotrack" size={34} color="black" />
      </Pressable>

      <Pressable onPress={() => router.replace("/auth/login")}>
        <AntDesign name="login" size={34} color="black" />
      </Pressable>
      

      {/* <CustomButton
        title="Cart"
        onPress={() => router.push("/cart")}
      /> */}

      {/* <CustomButton
        title="Wishlist"
        onPress={() => router.push("/wishlist")}
      /> */}

      {/* <CustomButton
        title="Login"
        onPress={() => router.push("/auth/login")}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "#ddd",
    backgroundColor: "#ccc8c8e2",
    borderRadius:40,
    paddingVertical:15,
  },
});