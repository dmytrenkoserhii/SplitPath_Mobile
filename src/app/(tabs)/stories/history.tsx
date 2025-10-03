import React from 'react';
import { StoryList } from '@/src/components/stories';
import { StoryStatus } from '@/src/enums';

export default function HistoryScreen() {
  return <StoryList status={StoryStatus.FINISHED} />;
}
