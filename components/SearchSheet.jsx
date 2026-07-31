import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

export default function SearchSheet({ visible, onSelectCategory, }) {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
    try {
        setLoading(true);

        const response = await fetch(
        "https://fakestoreapi.com/products/categories"
        );

        const data = await response.json();

        setCategories(data);
    } catch (err) {
        setError("Failed to load categories");
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
    if (visible && categories.length === 0) {
        fetchCategories();
    }
    }, [visible]);

    const translateY = useSharedValue(0);

    const OPEN_POSITION = -280;

    const opacity = useSharedValue(0);

    useEffect(() => {
    if (visible) {
        translateY.value = withSpring(OPEN_POSITION);
        opacity.value = withSpring(1);
    } else {
        translateY.value = withSpring(0);
        opacity.value = withSpring(0);
    }
    }, [visible]);

    const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
        {
        translateY: translateY.value,
        },
    ],
    }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.handle} />

      <Text style={styles.title}>
        Search Categories
      </Text>

        {loading ? (
        <ActivityIndicator
            size="large"
            color="#037a52"
        />
        ) : (
            <FlatList
                data={categories}
                keyExtractor={(item) => item}
                style={{ flex: 1, width: "100%" }}
                    contentContainerStyle={{
                        paddingHorizontal: 15,
                        paddingBottom: 20,
                    }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Pressable style={styles.categoryCard} onPress={() => onSelectCategory(item)}>
                        <Text style={styles.categoryText}>
                            {item}
                        </Text>
                    </Pressable>
                )}
            />
        )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    left: 15,
    right: 15,

    bottom: -200,

    height: 330,

    backgroundColor: "#fff",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    paddingTop: 15,
    paddingHorizontal: 15,
    alignItems: "center",

    elevation: 10,

    shadowColor: "#000",
    shadowOpacity: 0.15,
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
    backgroundColor: "#bbb",
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

categoryCard: {
    backgroundColor: "#f2f7f4",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 6,
},

categoryText: {
  fontSize: 18,
  fontWeight: "600",
  color: "#3d3e3d",
},
});