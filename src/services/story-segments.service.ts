import { xiorClient } from '@/src/lib';
import { StorySegment } from '@/src/types/story';

interface StorySegmentsApi {
  update: (
    segmentId: number,
    storyId: number,
    data: { selectedChoice: string }
  ) => Promise<StorySegment>;
}

const update = async (
  segmentId: number,
  storyId: number,
  data: { selectedChoice: string }
): Promise<StorySegment> => {
  const response = await xiorClient.patch<StorySegment>(
    `stories/${storyId}/segments/${segmentId}`,
    data
  );
  return response.data;
};

export const storySegmentsService: StorySegmentsApi = {
  update,
};
