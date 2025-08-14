import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StepItemProps {
  number: string;
  title: string;
  description: string;
}

export const StepItem = ({ number, title, description }: StepItemProps) => (
  <View style={styles.stepItem}>
    <View style={styles.stepNumberContainer}>
      <Text style={styles.stepNumber}>{number}</Text>
    </View>
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  stepItem: {
    flexDirection: "row",
    marginBottom: 32,
    alignItems: "flex-start",
  },
  stepNumberContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#ff8809",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  stepNumber: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    //Light mode: "#000000"
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: "#909296",
    //Light mode: "#868e96"
    lineHeight: 22,
  },
});
