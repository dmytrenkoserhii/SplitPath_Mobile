import { xiorClient } from '@/src/lib';
import { Story, StorySegment } from '@/src/types/story';
import { PaginatedResponse } from '@/src/types/shared';

export interface CreateStoryPayload {
  title: string;
  topicId: number;
}

export interface FindAllPaginatedOptions {
  page: number;
  limit: number;
  sort?: string;
  status?: string;
}

interface StoriesApi {
  create: (data: CreateStoryPayload) => Promise<Story>;
  findAllPaginated: (
    options: FindAllPaginatedOptions
  ) => Promise<PaginatedResponse<Story>>;
  findOneById: (id: number) => Promise<Story>;
  generateInitialSegment: (storyId: number) => Promise<StorySegment>;
  generateNextSegment: (storyId: number) => Promise<StorySegment>;
  generateFinalSegment: (storyId: number) => Promise<StorySegment>;
}

const create = async (data: CreateStoryPayload): Promise<Story> => {
  const response = await xiorClient.post<Story>('stories', data);
  return response.data;
};

const findAllPaginated = async ({
  page,
  limit,
  status,
  sort,
}: FindAllPaginatedOptions): Promise<PaginatedResponse<Story>> => {
  const response = await xiorClient.get<PaginatedResponse<Story>>('stories', {
    params: { page, limit, status, sort },
  });
  return response.data;
};

const findOneById = async (id: number): Promise<Story> => {
  const response = await xiorClient.get<Story>(`stories/${id}`);
  return response.data;
};

const generateInitialSegment = async (
  storyId: number
): Promise<StorySegment> => {
  const response = await xiorClient.post<StorySegment>(
    `stories/${storyId}/segments/generate-initial`
  );
  return response.data;
};

const generateNextSegment = async (storyId: number): Promise<StorySegment> => {
  const response = await xiorClient.post<StorySegment>(
    `stories/${storyId}/segments/generate-next`
  );
  return response.data;
};

const generateFinalSegment = async (storyId: number): Promise<StorySegment> => {
  const response = await xiorClient.post<StorySegment>(
    `stories/${storyId}/segments/generate-final`
  );
  return response.data;
};

export const storiesService: StoriesApi = {
  create,
  findAllPaginated,
  findOneById,
  generateInitialSegment,
  generateNextSegment,
  generateFinalSegment,
};
