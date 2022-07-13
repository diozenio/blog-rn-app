import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../../screens/auth/SignIn";
import SignUp from "../../screens/auth/SignUp";
import Authentication from "../../screens/auth/Authentication";

const Auth = createNativeStackNavigator();

const AuthRoutes = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Authentication" component={Authentication} />
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
