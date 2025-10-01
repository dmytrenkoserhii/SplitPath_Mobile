import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { TopicCard } from './topic-card';
import { StoryTopic } from '@/src/types/story';
import { ReactQueryTags } from '@/src/enums';
import { storyTopicsService } from '@/src/services';

interface TopicCardListProps {
  onEditTopic: (topic: StoryTopic) => void;
}

export const TopicCardList = ({ onEditTopic }: TopicCardListProps) => {
  const {
    data: topics,
    isLoading,
    error,
  } = useQuery({
    queryKey: [ReactQueryTags.STORY_TOPICS],
    queryFn: () => storyTopicsService.findAll(),
  });

  if (isLoading) {
    return (
      <ActivityIndicator
        animating={true}
        size="large"
        style={styles.centered}
      />
    );
  }

  if (error) {
    return (
      <Text style={styles.centered}>
        Failed to load topics. Please try again.
      </Text>
    );
  }

  if (!topics || topics.length === 0) {
    return (
      <Text style={styles.centered}>
        No topics yet. Tap the '+' button to create one!
      </Text>
    );
  }

  return (
    <FlatList
      data={topics}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <TopicCard topic={item} onEdit={onEditTopic} />}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
});
