import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { router } from "expo-router";

import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import Navbar from "../components/Navbar";
import { useAudioPlayer } from "expo-audio";

const songs = [
  {
    id: 1,
    title: "Krishna Flute",
    file: require("../assets/audio/ShreeKrishna_flute.mp3"),
    duration: "3:23",
  },
  {
    id: 2,
    title: "Piano",
    file: require("../assets/audio/piano.mp3"),
    duration: "1:03",
  },
  {
    id: 3,
    title: "Ocean Waves",
    file: require("../assets/audio/ocean.mp3"),
    duration: "0:31"
  },
];

export default function Audio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongId, setCurrentSongId] = useState(null);
    const player = useAudioPlayer();

    const playSong = (song) => {
        // Loads the selected song.
        player.replace(song.file); 
        // start playinh
        player.play();

        setIsPlaying(true);
        setCurrentSongId(song.id);
    };

    const pauseSong = () => {
      player.pause();
      setIsPlaying(false);
    };
    
  return (
    <View style={styles.container}>
      <Header title="Audio Player" />

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <View style={styles.songCard}>
            <View>
            <Text style={styles.songTitle}>
                {item.title}
            </Text>

            <Text style={styles.duration}>
                Duration: {item.duration}
            </Text>
            </View>

            <Pressable
              onPress={() => {
                if (
                  isPlaying &&
                  currentSongId === item.id
                ) {
                  pauseSong();
                } else {
                  playSong(item);
                }
              }}
            >
              <Ionicons
                name={
                  isPlaying &&
                  currentSongId === item.id
                    ? "pause-circle"
                    : "play-circle"
                }
                size={50}
                color="#037a52"
              />
            </Pressable>
        </View>
        )}
      />

      {/* <CustomButton
        title="← Back"
        onPress={() => router.replace("/")}
      /> */}
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    songCard: {
        backgroundColor: "#edeaea",
        padding: 18,
        borderRadius: 15,
        marginBottom: 15,
        marginTop:5,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    songTitle: {
        fontSize: 18,
        fontWeight: "700",
    },

    duration: {
        color: "#666",
        marginTop: 4,
    },
});