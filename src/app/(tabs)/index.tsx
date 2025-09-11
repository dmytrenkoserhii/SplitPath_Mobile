import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LogoutButton } from '../../components/auth';
import { CtaButton } from '../../components/home/CtaButton';
import { Feature } from '../../components/home/Feature';
import { StepItem } from '../../components/home/StepItem';
import { StoryPreview } from '../../components/home/StoryPreview';
import {
  FEATURED_STORIES,
  FEATURES,
  HOW_IT_WORKS_STEPS,
} from '../../constants/home';
import { useAuth } from '../../context';

export default function HomeScreen() {
  const navigateToStories = () => router.push('/(tabs)/stories');
  const { user, isAuthenticated } = useAuth();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Your Story, Your Choices</Text>

        {isAuthenticated && user && (
          <View style={styles.userSection}>
            <Text style={styles.welcomeText}>
              Welcome back, {user.account?.username || user.email}! 👋
            </Text>

            <View style={styles.verificationContainer}>
              <View
                style={[
                  styles.verificationBadge,
                  user.isEmailVerified
                    ? styles.verifiedBadge
                    : styles.unverifiedBadge,
                ]}
              >
                <Text
                  style={[
                    styles.verificationText,
                    user.isEmailVerified
                      ? styles.verifiedText
                      : styles.unverifiedText,
                  ]}
                >
                  {user.isEmailVerified
                    ? '✅ Email Verified'
                    : '⚠️ Email Not Verified'}
                </Text>
              </View>

              {!user.isEmailVerified && (
                <View style={styles.verifyButtonContainer}>
                  <Text style={styles.verifyDescription}>
                    Verify your email to unlock all features
                  </Text>
                  <TouchableOpacity
                    style={styles.verifyButton}
                    onPress={() => router.push('/(auth)/email-verification')}
                  >
                    <Text style={styles.verifyButtonText}>Verify Email</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}

        <Text style={styles.heroDescription}>
          Experience interactive storytelling powered by AI. Every choice
          matters, every story is unique.
        </Text>
        <CtaButton onPress={navigateToStories} title="Start Your Adventure" />

        {isAuthenticated && (
          <View style={styles.logoutContainer}>
            <LogoutButton title="Sign Out" />
          </View>
        )}
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
          title="Start Writing Your Story"
          iconName="sparkles"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b1e',
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
    alignItems: 'center',
  },
  finalCta: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ff8809',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 48,
  },
  heroDescription: {
    fontSize: 18,
    color: '#909296',
    // Light mode: "#868e96"
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    lineHeight: 24,
    maxWidth: 600,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ff8809',
    textAlign: 'center',
    marginBottom: 40,
  },
  stepsList: {
    paddingHorizontal: 10,
  },
  userSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#ff8809',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  verificationContainer: {
    width: '100%',
    alignItems: 'center',
  },
  verificationBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
  },
  verifiedBadge: {
    backgroundColor: '#d1fae5',
    borderColor: '#10b981',
    borderWidth: 1,
  },
  unverifiedBadge: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
    borderWidth: 1,
  },
  verificationText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  verifiedText: {
    color: '#065f46',
  },
  unverifiedText: {
    color: '#92400e',
  },
  verifyButtonContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  verifyDescription: {
    fontSize: 12,
    color: '#909296',
    textAlign: 'center',
    marginBottom: 8,
  },
  verifyButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  verifyButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  logoutContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
