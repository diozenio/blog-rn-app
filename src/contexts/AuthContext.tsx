import React from "react";
import { createContext, useCallback, useMemo, useState } from "react";
import SweetAlert from "react-native-sweet-alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

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
    // const user = await signInAsync();
    SweetAlert.showAlertWithOptions({
      title: "OK",
      subTitle: "Usuário logado com sucesso",
      confirmButtonTitle: "OK",
      confirmButtonColor: "#000",
      otherButtonTitle: "Cancel",
      otherButtonColor: "#dedede",
      style: "success",
      cancellable: true,
    });
    setUser(data);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const signUp = useCallback(async (data: User) => {
    // SweetAlert.showAlertWithOptions({
    //   title: "OK",
    //   subTitle: "Usuário cadastrado com sucesso",
    //   confirmButtonTitle: "OK",
    //   confirmButtonColor: "#000",
    //   otherButtonTitle: "Cancel",
    //   otherButtonColor: "#dedede",
    //   style: "success",
    //   cancellable: true,
    // });

    console.log(data);
    
    setUser(data);
    // try {
    //   const newUser = {
    //     id: uuid.v4(),
    //     username: data.username,
    //     email: data.email,
    //     password: data.password,
    //   };
    //   const jsonValue = JSON.stringify(newUser);
    //   await AsyncStorage.setItem("@blog:users", jsonValue);
    //   SweetAlert.showAlertWithOptions({
    //     title: "OK",
    //     subTitle: "Usuário cadastrado com sucesso",
    //     confirmButtonTitle: "OK",
    //     confirmButtonColor: "#000",
    //     otherButtonTitle: "Cancel",
    //     otherButtonColor: "#dedede",
    //     style: "success",
    //     cancellable: true,
    //   });
    //   setUser({});
    // } catch (e) {
    //   // saving error
    //   console.log(e);
    // }
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
