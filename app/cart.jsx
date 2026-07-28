import { View, Text, FlatList, Image, StyleSheet } from "react-native";

import { router } from "expo-router";
import { useCart } from "../context/CartContext";
import CustomButton from "../components/CustomButton";


export default function Cart() {

  const { cart } = useCart();


  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        My Cart
      </Text>


      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />


            <View>
              <Text style={styles.name}>
                {item.title}
              </Text>

              <Text style={styles.price}>
                £{item.price}
              </Text>
            </View>

          </View>

        )}
      />

      <CustomButton
        title="← Back"
        onPress={() => router.replace("/")}
        />

    </View>
  );
}


const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
  },

  title:{
    fontSize:26,
    fontWeight:"bold",
    marginBottom:20,
  },

  card:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:15,
    padding:10,
    backgroundColor:"#eee",
    borderRadius:10,
    gap:10,
  },

  image:{
    width:80,
    height:80,
  },

  name:{
    width:220,
    fontSize:16,
    fontWeight:"600",
  },

  price:{
    marginTop:5,
    fontSize:18,
    fontWeight:"bold",
  }

});