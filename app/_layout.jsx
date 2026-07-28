import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
         <CartProvider>
            <Stack screenOptions={{ headerShown: false, }} />
        </CartProvider>
    </SafeAreaProvider>
   
   
  );
}