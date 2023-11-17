import { PostData } from './types';

// This value should be taken from envs
const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function makeRequest<SuccessPayload>(
  path: string,
  options?: RequestInit,
): Promise<SuccessPayload> {
  return fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    ...options,
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

const API_HANDLERS = {
  POSTS: {
    GET: (): Promise<PostData[]> => makeRequest('/posts'),
    UPDATE: (id: number | string, data: PostData): Promise<PostData> =>
      makeRequest(`/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
  },
};

export default API_HANDLERS;
