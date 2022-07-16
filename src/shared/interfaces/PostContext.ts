export interface PostData {
  id: string;
  username: string;
  content: string;
}

export type PostContextData = {
  fetchPosts(): Promise<void>;
  posts?: PostData[];
};
