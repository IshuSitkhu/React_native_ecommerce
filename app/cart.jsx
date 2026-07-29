import { View, Text, FlatList, Image, StyleSheet } from "react-native";

import { router } from "expo-router";
import { useCart } from "../context/CartContext";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Cart() {

    const { cart, removeFromCart, increaseQuantity, decreaseQuantity,} = useCart();

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);


    return (
    <>
        <SafeAreaView style={{flex:1}}>
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

                        <View style={styles.info}>
                            <Text style={styles.name}>
                                {item.title}
                            </Text>

                            <Text style={styles.price}>
                            £{item.price}
                            </Text>

                            <View style={styles.quantityContainer}>

                                <Text style={styles.quantityButton} onPress={() => decreaseQuantity(item.id)}>
                                    -
                                </Text>

                                <Text style={styles.quantity}>
                                    {item.quantity}
                                </Text>

                                <Text
                                    style={styles.quantityButton}
                                    onPress={() => increaseQuantity(item.id)}
                                >
                                    +
                                </Text>

                                <Text style={styles.remove} onPress={() => removeFromCart(item.id)}> Remove </Text>
                            </View>
                        </View>
                    </View>
                )}
            />

            <Text style={styles.total}>
                Total: £{total.toFixed(2)}
            </Text>

            <CustomButton
                title="← Back"
                onPress={() => router.replace("/")}
            />

            </View>
        </SafeAreaView>
    </>
    );
}


const styles = StyleSheet.create({

    info: {
        flex: 1,
    },

    container:{
        flex:1,
        padding:20,
    },

    title:{
        fontSize:26,
        fontWeight:"bold",
        alignItems: "center",
        marginBottom:20,
        marginTop:10,
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
        fontSize:16,
        fontWeight:"600",
    },

    price:{
        marginTop:5,
        fontSize:18,
        fontWeight:"bold",
    },

    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },

    quantityButton: {
        fontSize: 22,
        fontWeight: "bold",
        paddingHorizontal: 12,
    },

    quantity: {
        fontSize: 18,
        marginHorizontal: 10,
    },

    remove: {
        color: "red",
        marginLeft: 20,
        fontWeight: "bold",
        fontSize: 18,
    },

    total: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
    },

});