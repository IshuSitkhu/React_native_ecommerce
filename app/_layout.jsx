import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { WishlistProvider } from "../context/WishlistContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <WishlistProvider>
         <CartProvider>
            <Stack screenOptions={{ headerShown: false, }} />
            <Toast />
        </CartProvider>
      </WishlistProvider>
    </SafeAreaProvider>
   
   
  );
}