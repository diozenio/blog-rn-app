import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import SignIn from "../screens/SignIn";
import Register from "../screens/Register";
import Authentication from "../screens/Authentication";

const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Authentication"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          statusBarHidden: true,
        }}
      >
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
