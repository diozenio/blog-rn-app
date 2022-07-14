import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import CreateMessage from "../../screens/CreateMessage";

const AppRouter = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <AppRouter.Navigator screenOptions={{ headerShown: false }}>
      <AppRouter.Screen name="Home" component={Home} />
      <AppRouter.Screen name="CreateMessage" component={CreateMessage} />
    </AppRouter.Navigator>
  );
};

export default AppRoutes;
