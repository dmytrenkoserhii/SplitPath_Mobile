import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <View style={styles.featureContainer}>
      <View style={styles.iconContainer}>{icon}</View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  featureContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: "#fff4e1",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    //Light mode: "#000000"
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#909296",
    //Light mode: "#868e96"
    lineHeight: 20,
  },
});
