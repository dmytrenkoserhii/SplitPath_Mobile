import { CreateTopicModal } from '@/src/components/stories/CreateTopicModal';
import { TopicCardList } from '@/src/components/stories/TopicCardList';
import { UpdateTopicModal } from '@/src/components/stories/UpdateTopicModal';
import { StoryTopic } from '@/src/types/story';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TopicsScreen() {
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<StoryTopic | null>(null);

  const handleOpenCreateModal = () => setCreateModalVisible(true);
  const handleCloseCreateModal = () => setCreateModalVisible(false);

  const handleOpenUpdateModal = (topic: StoryTopic) => {
    setSelectedTopic(topic);
    setUpdateModalVisible(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedTopic(null);
    setUpdateModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopicCardList onEditTopic={handleOpenUpdateModal} />

      <CreateTopicModal
        visible={isCreateModalVisible}
        onDismiss={handleCloseCreateModal}
      />

      <UpdateTopicModal
        visible={isUpdateModalVisible}
        onDismiss={handleCloseUpdateModal}
        topic={selectedTopic}
      />

      <FAB icon="plus" style={styles.fab} onPress={handleOpenCreateModal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
