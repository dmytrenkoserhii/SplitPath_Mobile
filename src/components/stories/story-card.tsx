import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Chip, useTheme } from 'react-native-paper';

import { StoryStatus } from '@/src/enums';
import { Story } from '@/src/types/story';

interface StoryCardProps {
  story: Story;
}

export const StoryCard = ({ story }: StoryCardProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const getStatusStyle = () => {
    switch (story.status) {
      case StoryStatus.FINISHED:
        return { icon: 'check-circle', color: '#4CAF50' };
      case StoryStatus.IN_PROGRESS:
        return { icon: 'progress-pencil', color: '#FFC107' };
      default:
        return { icon: 'new-box', color: '#2196F3' };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/stories/${story.id}` as any)}
    >
      <Card style={styles.card}>
        <Card.Title title={story.title} titleVariant="titleMedium" />
        <Card.Content>
          <Text variant="bodySmall" style={styles.topicText}>
            Topic: {story.storyTopic.name}
          </Text>
          <Text
            variant="bodyMedium"
            numberOfLines={3}
            style={styles.segmentText}
          >
            {story.segments?.[0]?.text || 'The story has not yet begun...'}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Chip icon={statusStyle.icon} selectedColor={statusStyle.color}>
            {story.status}
          </Chip>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    card: {
      marginVertical: 8,
      marginHorizontal: 16,
      backgroundColor: theme.colors.surface,
    },
    topicText: {
      marginBottom: 8,
      opacity: 0.7,
      color: theme.colors.onSurfaceVariant,
    },
    segmentText: {
      minHeight: 60,
      color: theme.colors.onSurface,
    },
  });
