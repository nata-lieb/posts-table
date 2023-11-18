export interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type UpdatePostData = Omit<PostData, 'userId'>;
