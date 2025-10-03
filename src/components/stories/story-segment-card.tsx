import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { StorySegment } from '@/src/types/story';

interface StorySegmentCardProps {
  segment: StorySegment;
  onChoiceSelect: (choice: string) => void;
  isGenerating: boolean;
  isCurrentSegment: boolean;
}

export const StorySegmentCard = ({
  segment,
  onChoiceSelect,
  isGenerating,
  isCurrentSegment,
}: StorySegmentCardProps) => {
  const hasSelectedChoice = !!segment.selectedChoice;
  const isFinalSegment = segment.choices.length === 0;

  const paragraphs = segment.text.split(/\n\s*\n/).filter(p => p.trim());

  return (
    <Card style={styles.card}>
      <Card.Content>
        {paragraphs.map((p, index) => (
          <Text key={index} variant="bodyLarge" style={styles.paragraph}>
            {p}
          </Text>
        ))}
        {!isFinalSegment && (
          <View style={styles.choicesContainer}>
            {segment.choices.map(choice => {
              const isSelected = choice === segment.selectedChoice;
              return (
                <Button
                  key={choice}
                  mode={isSelected ? 'contained' : 'outlined'}
                  onPress={() => onChoiceSelect(choice)}
                  disabled={hasSelectedChoice || isGenerating}
                  loading={isGenerating && isCurrentSegment}
                  style={styles.choiceButton}
                >
                  {choice}
                </Button>
              );
            })}
          </View>
        )}
        {isFinalSegment && (
          <View style={styles.finalSegmentContainer}>
            <Text variant="headlineSmall" style={styles.finalTitle}>
              Adventure Complete!
            </Text>
            <Button mode="contained" onPress={() => router.replace('/stories')}>
              Start a New Adventure
            </Button>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginHorizontal: 16, marginVertical: 8 },
  paragraph: { marginBottom: 16, lineHeight: 24 },
  choicesContainer: { marginTop: 16, gap: 8 },
  choiceButton: { paddingVertical: 4 },
  finalSegmentContainer: { alignItems: 'center', gap: 16, marginTop: 24 },
  finalTitle: { color: '#4CAF50' },
});
