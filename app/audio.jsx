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
import { SafeAreaView } from "react-native-safe-area-context";

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
      // if not same song then 
      if (currentSongId !== song.id) {
        // Loads the selected song.
        player.replace(song.file);
        setCurrentSongId(song.id);
      }

      // start playinh
      player.play();
      setIsPlaying(true);
    };

    const pauseSong = () => {
      player.pause();
      setIsPlaying(false);
    };
    
    const toggleSong = (song) => {
      if (isPlaying && currentSongId === song.id) {
        pauseSong();
      } else {
        playSong(song);
      }
    };
  return (
    <>
      <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
          <Header title="Audio Player" />

          <FlatList
            data={songs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={[styles.songCard, currentSongId === item.id && styles.activeSong,]}>
                <View>
                <Text style={styles.songTitle}>
                    {item.title}
                </Text>

                <Text style={styles.duration}>
                    Duration: {item.duration}
                </Text>
                </View>

                <Pressable
                  onPress={() => toggleSong(item)}>
                  <Ionicons
                    name={ isPlaying && currentSongId === item.id ? "pause-circle" : "play-circle"}
                    size={50}
                    color="#037a52"
                  />
                </Pressable>
            </View>
            )}
          />
          <Navbar />
        </View>
      </SafeAreaView>
    </>
    
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

    nowPlaying: {
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      marginVertical: 15,
      color: "#037a52",
    },
    activeSong: {
      borderWidth: 2,
      borderColor: "#037a52",
    },
});