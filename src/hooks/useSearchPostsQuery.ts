import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { PostData } from 'api';
import { useCallback } from 'react';
import { usePostsQuery } from 'hooks';

export default function useSearchPostsQuery(
  search?: string,
  options?: UseQueryOptions<PostData[]>,
): UseQueryResult<PostData[]> {
  // Memoize to prevent run on every render
  const searchByTitle = useCallback(
    (posts: PostData[]): PostData[] => {
      return search
        ? posts.filter((post) =>
            post.title.toLowerCase().includes(search.toLowerCase()),
          )
        : posts;
    },
    [search],
  );

  return usePostsQuery({
    ...options,
    select: searchByTitle,
  });
}
