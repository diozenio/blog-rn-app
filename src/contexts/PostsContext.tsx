import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { PostContextData, PostData } from "../shared/interfaces/PostContext";

export const PostsContext = React.createContext<PostContextData>(
  {} as PostContextData
);

export default function PostsProvider({ children }: any) {
  const [posts, setPosts] = React.useState<PostData[] | undefined>();

  async function fetchPosts() {
    const response = await AsyncStorage.getItem("@blog:posts");
    const previousPosts = response ? JSON.parse(response) : [];
    setPosts(previousPosts);
  }

  return (
    <PostsContext.Provider value={{ posts, fetchPosts }}>
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => {
  const context = React.useContext(PostsContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// export const withPosts = (Component: React.FC): React.FC => {
//   return () => {
//     return (
//       <PostsProvider>
//         <Component />
//       </PostsProvider>
//     );
//   };
// };
