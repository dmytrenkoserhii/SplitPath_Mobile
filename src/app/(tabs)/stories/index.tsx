import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';

import { StoryTopicCard } from '@/src/components/stories';
import { ReactQueryTags } from '@/src/enums';
import { storyTopicsService } from '@/src/services';

export default function NewStoryScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const {
    data: topics,
    isLoading,
    error,
  } = useQuery({
    queryKey: [ReactQueryTags.STORY_TOPICS],
    queryFn: storyTopicsService.findAll,
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Failed to load topics.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={topics}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <StoryTopicCard topic={item} />}
      contentContainerStyle={styles.list}
    />
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    list: {
      paddingTop: 8,
      paddingBottom: 16,
      backgroundColor: theme.colors.background,
    },
  });
