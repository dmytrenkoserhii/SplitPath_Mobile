import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CtaButton } from "../../components/home/CtaButton";
import { Feature } from "../../components/home/Feature";
import { StepItem } from "../../components/home/StepItem";
import { StoryPreview } from "../../components/home/StoryPreview";
import {
  FEATURED_STORIES,
  FEATURES,
  HOW_IT_WORKS_STEPS,
} from "../../constants/home";

export default function HomeScreen() {
  const navigateToStories = () => router.push("/(tabs)/stories");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Your Story, Your Choices</Text>
        <Text style={styles.heroDescription}>
          Experience interactive storytelling powered by AI. Every choice
          matters, every story is unique.
        </Text>
        <CtaButton onPress={navigateToStories} title='Start Your Adventure' />
      </View>

      <View style={styles.section}>
        {FEATURES.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepsList}>
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <StepItem key={index} {...step} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Adventures</Text>
        {FEATURED_STORIES.map((story, index) => (
          <StoryPreview key={index} {...story} />
        ))}
      </View>

      <View style={styles.finalCta}>
        <CtaButton
          onPress={navigateToStories}
          title='Start Writing Your Story'
          iconName='sparkles'
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1b1e",
    //Light mode: "#ffffff"
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 60,
    alignItems: "center",
  },
  finalCta: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: "900",
    color: "#ff8809",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 48,
  },
  heroDescription: {
    fontSize: 18,
    color: "#909296",
    // Light mode: "#868e96"
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
    lineHeight: 24,
    maxWidth: 600,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ff8809",
    textAlign: "center",
    marginBottom: 40,
  },
  stepsList: {
    paddingHorizontal: 10,
  },
});
