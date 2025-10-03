import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';

import { StoryCard } from './story-card';
import { ReactQueryTags } from '@/src/enums';
import { storiesService } from '@/src/services';

interface StoryListProps {
  status: string;
}

const ITEMS_PER_PAGE = 10;

export const StoryList = ({ status }: StoryListProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [ReactQueryTags.STORIES, status],
    queryFn: ({ pageParam = 1 }) =>
      storiesService.findAllPaginated({
        page: pageParam,
        limit: ITEMS_PER_PAGE,
        status,
      }),
    getNextPageParam: lastPage => {
      if (lastPage.meta.currentPage < lastPage.meta.totalPages) {
        return lastPage.meta.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
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
        <Text>Failed to load stories.</Text>
      </View>
    );
  }

  const stories = data?.pages.flatMap(page => page.items) ?? [];

  if (stories.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No stories found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={stories}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <StoryCard story={item} />}
      contentContainerStyle={styles.list}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator animating={true} style={{ marginVertical: 20 }} />
        ) : null
      }
    />
  );
};

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
