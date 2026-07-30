import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { WishlistProvider } from "../context/WishlistContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <WishlistProvider>
          <CartProvider>
              <Stack screenOptions={{ headerShown: false, }} />
              <Toast />
          </CartProvider>
        </WishlistProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
   
   
  );
}