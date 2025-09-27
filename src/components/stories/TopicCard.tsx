import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { StoryTopic } from '@/src/types/story';
import { storyTopicsService } from '@/src/services/story-topics.service';
import { ReactQueryTags } from '@/src/enums/react-query-tags';

interface TopicCardProps {
  topic: StoryTopic;
  onEdit: (topic: StoryTopic) => void;
}

export const TopicCard = ({ topic, onEdit }: TopicCardProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTopic } = useMutation({
    mutationFn: (id: number) => storyTopicsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryTags.STORY_TOPICS],
      });
      Toast.show({
        type: 'success',
        text1: 'Topic Deleted',
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Deletion Failed',
      });
    },
  });

  const handleDelete = () => {
    Alert.alert(
      'Delete Topic',
      `Are you sure you want to delete "${topic.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTopic(topic.id),
        },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={() => onEdit(topic)}>
      <Card style={styles.card}>
        <Card.Title title={topic.name} titleVariant="titleMedium" />
        <Card.Content>
          <Text variant="bodyMedium" numberOfLines={3}>
            {topic.description}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => onEdit(topic)}>Edit</Button>
          <Button onPress={handleDelete} textColor="red">
            Delete
          </Button>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
});
