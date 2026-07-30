import { StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import CustomButton from "./CustomButton";



export default function DragToCart({onAddToCart,   isInCart,}) {

  // sheet starts CLOSED
  const translateY = useSharedValue(0);

  // remember last position
  const context = useSharedValue(0);

  // how far it opens
  const OPEN_POSITION = -150;

  const pan = Gesture.Pan()

    .onBegin(() => {
      context.value = translateY.value;
    })

    .onUpdate((event) => {

      let next = context.value + event.translationY;

      // don't go lower than closed
      if (next > 0) next = 0;

      // don't go higher than fully opened
      if (next < OPEN_POSITION)
        next = OPEN_POSITION;

      translateY.value = next;
    })

    .onEnd(() => {

      if (translateY.value < OPEN_POSITION / 2) {
        // open
        translateY.value =
          withSpring(OPEN_POSITION);
      } else {
        // close
        translateY.value =
          withSpring(0);
      }

    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          styles.container,
          animatedStyle,
        ]}
      >
        <View style={styles.handle} />
        

        <Text style={styles.title}>
          Ready to buy?
        </Text>
        <Ionicons name="cart" size={29} color="#037a52" />
        <Text style={styles.subtitle}>
            Add this product to your cart.
        </Text>
        <CustomButton
            title={isInCart ? "Added to Cart! " : "Add to Cart"}
            onPress={onAddToCart}
            variant={isInCart ? "green" : "secondary"}
            />

        <Text  style={styles.subtitle}>Buy Now!!</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({

  container: {
    position: "absolute",

    left: 0,
    right: 0,

    // hide most of sheet
    bottom: -280,

    height: 350,

    backgroundColor: "#101010e2",

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    margin:20,

    alignItems: "center",

    paddingTop: 18,

    elevation: 10,

    shadowColor: "#efebeb",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },

  handle: {
    width: 60,
    height: 6,
    borderRadius: 20,
    backgroundColor: "#e8e1e1",
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: "#e8e1e1",
    
  },

  subtitle: {
    marginTop: 5,
    fontSize: 16,
    color: "#e8e1e1",
  },
});