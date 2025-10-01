import { XiorResponse } from 'xior';

import { xiorClient } from '@/src/lib';
import { CreateTopicSchemaType } from '@/src/schemas/stories';
import { StoryTopic } from '@/src/types/story';

interface StoryTopicsApi {
  findAll: () => Promise<StoryTopic[]>;
  create: (data: CreateTopicSchemaType) => Promise<StoryTopic>;
  update: (id: number, data: CreateTopicSchemaType) => Promise<StoryTopic>;
  delete: (id: number) => Promise<XiorResponse<StoryTopic>>;
}

const findAll = async (): Promise<StoryTopic[]> => {
  const response = await xiorClient.get<StoryTopic[]>('story-topics');
  return response.data;
};

const create = async (data: CreateTopicSchemaType): Promise<StoryTopic> => {
  const response = await xiorClient.post<StoryTopic>('story-topics', data);
  return response.data;
};

const update = async (
  id: number,
  data: CreateTopicSchemaType
): Promise<StoryTopic> => {
  const response = await xiorClient.patch<StoryTopic>(
    `story-topics/${id}`,
    data
  );
  return response.data;
};

const deleteTopic = async (id: number): Promise<XiorResponse<StoryTopic>> => {
  return xiorClient.delete<StoryTopic>(`story-topics/${id}`);
};

export const storyTopicsService: StoryTopicsApi = {
  findAll,
  create,
  update,
  delete: deleteTopic,
};
