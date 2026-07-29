import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
         <CartProvider>
            <Stack screenOptions={{ headerShown: false, }} />
            <Toast />
        </CartProvider>
    </SafeAreaProvider>
   
   
  );
}