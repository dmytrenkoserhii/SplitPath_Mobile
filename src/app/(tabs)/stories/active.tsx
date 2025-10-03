import React from 'react';
import { StoryList } from '@/src/components/stories';
import { StoryStatus } from '@/src/enums';

export default function ActiveStoriesScreen() {
  const activeStatuses = `${StoryStatus.NEW},${StoryStatus.IN_PROGRESS}`;

  return <StoryList status={activeStatuses} />;
}
