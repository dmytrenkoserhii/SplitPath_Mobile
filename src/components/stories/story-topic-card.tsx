import { router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { storiesService } from '@/src/services';
import { StoryTopic } from '@/src/types/story';

interface StoryTopicCardProps {
  topic: StoryTopic;
}

export const StoryTopicCard = ({ topic }: StoryTopicCardProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const { mutate: startStory, isPending } = useMutation({
    mutationFn: () => {
      const storyTitle = `${topic.name} Adventure`;
      return storiesService.create({
        title: storyTitle,
        topicId: topic.id,
      });
    },
    onSuccess: story => {
      Toast.show({
        type: 'success',
        text1: 'Starting Your Adventure',
        text2: 'Preparing your story...',
      });
      router.push(`/stories/${story.id}` as any);
    },
    onError: (error: Error) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Failed to create story.',
      });
    },
  });

  return (
    <Card style={styles.card}>
      <Card.Title title={topic.name} titleVariant="titleLarge" />
      <Card.Content>
        <Text variant="bodyMedium" numberOfLines={5} style={styles.description}>
          {topic.description}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => startStory()}
          loading={isPending}
          disabled={isPending}
          style={styles.button}
        >
          Start Adventure
        </Button>
      </Card.Actions>
    </Card>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    card: {
      marginVertical: 8,
      marginHorizontal: 16,
      backgroundColor: theme.colors.surface,
    },
    description: {
      minHeight: 80,
      lineHeight: 22,
      color: theme.colors.onSurface,
    },
    button: {
      flex: 1,
      margin: 8,
    },
  });
