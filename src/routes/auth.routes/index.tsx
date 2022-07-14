import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../../screens/auth/SignIn";
import SignUp from "../../screens/auth/SignUp";
import LandingPage from "../../screens/auth/LandingPage";

const Auth = createNativeStackNavigator();

const AuthRoutes = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="LandingPage" component={LandingPage} />
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
