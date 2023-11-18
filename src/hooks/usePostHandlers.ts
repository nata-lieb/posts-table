import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { API_HANDLERS, PostData, UpdatePostData } from 'api';

interface PostHandlers {
  updatePostMutation: UseMutationResult<PostData, Error, UpdatePostData>;
}

export default function usePostHandlers(): PostHandlers {
  const updatePostMutation = useMutation<PostData, Error, UpdatePostData>({
    mutationFn: (data: UpdatePostData) => {
      return API_HANDLERS.POSTS.UPDATE(data);
    },
  });

  return { updatePostMutation };
}
