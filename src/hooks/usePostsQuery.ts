import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { API_HANDLERS, PostData } from 'api';

export default function usePostsQuery(
  options?: Omit<UseQueryOptions<PostData[]>, 'queryKey' | 'queryFn'>,
): UseQueryResult<PostData[]> {
  return useQuery<PostData[]>({
    refetchOnWindowFocus: false,
    staleTime: 3000,
    ...options,
    queryKey: ['posts'],
    queryFn: async () => API_HANDLERS.POSTS.GET().then((data) => data),
  });
}
