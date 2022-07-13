import React from "react";
import { createContext, useCallback, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { Alert } from "react-native";

interface User {
  username: string;
  email: string;
  password: string;
}

type AuthContextData = {
  user: any;
  signIn(data: any): Promise<void>;
  signOut(): void;
  signUp(data: any): Promise<void>;
  isSigned: boolean;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const signIn = useCallback(async (data: any) => {
    const { password, email } = data;
    try {
      var response = await AsyncStorage.getItem("@blog:users");
      const previousUsers: Array<User> = response ? JSON.parse(response) : [];
      const hasUserRegistered = previousUsers.find(
        (e) => e.email === email && e.password === password
      );
      if (hasUserRegistered !== undefined) {
        setUser(hasUserRegistered);
      } else {
        Alert.alert("Wrong credentials. Please try again");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const signUp = useCallback(async (data: User) => {
    const { username, password, email } = data;

    try {
      var response = await AsyncStorage.getItem("@blog:users");
      const previousUsers = response ? JSON.parse(response) : [];
      const hasUserEmail = previousUsers.some((element: User) => {
        return element.email === email;
      });
      if (hasUserEmail === true) {
        Alert.alert("This email has already been used by another user");
      } else {
        const newUser = {
          id: uuid.v4(),
          username: username,
          email: email,
          password: password,
        };
        const newData = [previousUsers, newUser];
        await AsyncStorage.setItem("@blog:users", JSON.stringify(newData));
        Alert.alert("User successfully registered");
        setUser(newUser);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const isSigned = useMemo(() => !!user, [user]);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isSigned, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
