import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { ReactQueryTags } from '@/src/enums/react-query-tags';
import {
  CreateTopicSchema,
  CreateTopicSchemaType,
} from '@/src/schemas/stories/create-topic.schema';
import { StoryTopic } from '@/src/types/story';
import { storyTopicsService } from '@/src/services/story-topics.service';

interface UpdateTopicModalProps {
  visible: boolean;
  onDismiss: () => void;
  topic: StoryTopic | null;
}

export const UpdateTopicModal = ({
  visible,
  onDismiss,
  topic,
}: UpdateTopicModalProps) => {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CreateTopicSchemaType>({
    resolver: zodResolver(CreateTopicSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (topic) {
      reset({
        name: topic.name,
        description: topic.description || '',
      });
    }
  }, [topic, reset]);

  const { mutate: updateTopic, isPending } = useMutation({
    mutationFn: (values: CreateTopicSchemaType) => {
      if (!topic) throw new Error('Topic not selected');
      return storyTopicsService.update(topic.id, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryTags.STORY_TOPICS],
      });
      Toast.show({
        type: 'success',
        text1: 'Topic Updated',
        text2: 'The topic was updated successfully.',
      });
      onDismiss();
    },
    onError: (error: Error) => {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: error.message || 'An unexpected error occurred.',
      });
    },
  });

  const onSubmit = (data: CreateTopicSchemaType) => {
    updateTopic(data);
  };

  if (!topic) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <Text variant="headlineSmall" style={styles.title}>
          Edit Topic
        </Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Topic Name"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={!!errors.name}
              style={styles.input}
            />
          )}
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Story Generation Guide"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={!!errors.description}
              multiline
              numberOfLines={4}
              style={styles.input}
            />
          )}
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description.message}</Text>
        )}

        <View style={styles.buttonContainer}>
          <Button onPress={onDismiss} mode="outlined" style={styles.button}>
            Cancel
          </Button>
          <Button
            onPress={handleSubmit(onSubmit)}
            mode="contained"
            loading={isPending}
            disabled={!isValid || isPending}
            style={styles.button}
          >
            Save Changes
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  title: { marginBottom: 20, textAlign: 'center' },
  input: { marginBottom: 10 },
  errorText: { color: 'red', marginBottom: 10, marginTop: -5 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  button: { marginLeft: 10 },
});
