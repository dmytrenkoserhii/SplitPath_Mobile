import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface StoryPreviewProps {
  title: string;
  description: string;
  image: ImageSourcePropType;
}

export const StoryPreview = ({
  title,
  description,
  image,
}: StoryPreviewProps) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={image}
        style={styles.imageSection}
        resizeMode='cover'
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.gradientOverlay}
        >
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 24,
    elevation: 4,
    shadowColor: "#25262b",
    //Light mode: "#f8f9fa"
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  imageSection: {
    height: 250,
    justifyContent: "flex-end",
  },
  gradientOverlay: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: "white",
    lineHeight: 22,
  },
});
