import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { StorySegmentCard } from '@/src/components/stories';
import { ReactQueryTags } from '@/src/enums';
import { storiesService, storySegmentsService } from '@/src/services';

const LoadingScreen = ({ message }: { message: string }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" style={{ marginBottom: 16 }} />
      <Text variant="titleLarge">{message}</Text>
    </View>
  );
};

export default function StoryDetailScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { id } = useLocalSearchParams();
  const storyId = Number(id);
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);
  const initialSegmentGenerated = useRef(false);

  const {
    data: story,
    isLoading,
    error,
  } = useQuery({
    queryKey: [ReactQueryTags.STORY, storyId],
    queryFn: () => storiesService.findOneById(storyId),
    enabled: !!storyId,
  });

  useEffect(() => {
    if (story?.title) {
      navigation.setOptions({ title: story.title });
    }
  }, [story?.title, navigation]);

  const { mutate: generateInitialSegment, isPending: isGeneratingInitial } =
    useMutation({
      mutationFn: () => storiesService.generateInitialSegment(storyId),
      onSuccess: () => {
        Toast.show({ type: 'success', text1: 'Your adventure begins!' });
        queryClient.invalidateQueries({
          queryKey: [ReactQueryTags.STORY, storyId],
        });
      },
      onError: (e: Error) => Toast.show({ type: 'error', text1: e.message }),
    });

  const { mutate: selectChoice, isPending: isProcessingChoice } = useMutation({
    mutationFn: async ({
      segmentId,
      choice,
    }: {
      segmentId: number;
      choice: string;
    }) => {
      await storySegmentsService.update(segmentId, storyId, {
        selectedChoice: choice,
      });
      if (!story) throw new Error('Story not found');

      const nextSegmentNumber = story.segments.length + 1;
      if (nextSegmentNumber < story.numberOfSegments) {
        return storiesService.generateNextSegment(storyId);
      } else {
        return storiesService.generateFinalSegment(storyId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryTags.STORY, storyId],
      });
      setTimeout(() => flatListRef.current?.scrollToEnd(), 300);
    },
    onError: (e: Error) => Toast.show({ type: 'error', text1: e.message }),
  });

  useEffect(() => {
    if (
      story &&
      story.segments.length === 0 &&
      !isGeneratingInitial &&
      !initialSegmentGenerated.current
    ) {
      initialSegmentGenerated.current = true;
      generateInitialSegment();
    }
  }, [story, isGeneratingInitial, generateInitialSegment]);

  if (isLoading) return <LoadingScreen message="Loading Story..." />;
  if (isGeneratingInitial)
    return <LoadingScreen message="Your story is brewing..." />;
  if (error || !story) return <LoadingScreen message="Could not load story." />;

  return (
    <FlatList
      ref={flatListRef}
      data={story.segments}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item, index }) => {
        const isLastSegment = index === story.segments.length - 1;
        return (
          <StorySegmentCard
            segment={item}
            onChoiceSelect={choice =>
              selectChoice({ segmentId: item.id, choice })
            }
            isGenerating={isProcessingChoice && isLastSegment}
            isCurrentSegment={isLastSegment}
          />
        );
      }}
      ListFooterComponent={
        isProcessingChoice ? (
          <ActivityIndicator animating style={{ margin: 20 }} />
        ) : null
      }
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
      padding: 16,
      backgroundColor: theme.colors.background,
    },
    list: {
      paddingTop: 8,
      paddingBottom: 16,
      backgroundColor: theme.colors.background,
    },
  });
