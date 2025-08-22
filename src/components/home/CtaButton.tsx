import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface CtaButtonProps {
  onPress: () => void;
  title: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export const CtaButton = ({ onPress, title, iconName }: CtaButtonProps) => {
  return (
    <TouchableOpacity style={styles.ctaButtonContainer} onPress={onPress}>
      <LinearGradient
        colors={["#ff8809", "#ff6b6b"]}
        style={styles.ctaButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color='white'
            style={styles.buttonIcon}
          />
        )}
        <Text style={styles.ctaButtonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ctaButtonContainer: {
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  ctaButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonIcon: {
    marginRight: 8,
  },
});
