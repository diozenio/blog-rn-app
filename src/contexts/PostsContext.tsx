import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";

export const PostsContext = React.createContext({});

export default function PostsProvider({ children }: any) {
  const [posts, setPosts] = React.useState([]);

  async function fetchPosts() {
    var response = await AsyncStorage.getItem("@blog:posts");
    const previousPosts = response ? JSON.parse(response) : [];
    setPosts(previousPosts);
  }

  return (
    <PostsContext.Provider value={{ posts, setPosts, fetchPosts }}>
      {children}
    </PostsContext.Provider>
  );
}
