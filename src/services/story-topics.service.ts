import { XiorResponse } from 'xior';

import { xiorClient } from '../lib/xior-client';
import { CreateTopicSchemaType } from '../schemas/stories/create-topic.schema';
import { StoryTopic } from '../types/story/story-topic.interface';

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
