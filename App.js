import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import Home from "./screen/Homescreen";
import Login from "./screen/Loginscreen";
import Signup from "./screen/Signupscreen";
import Students from "./screen/Students";
const Stack = createNativeStackNavigator();

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#121212",
    card: "#1F1F1F",
    text: "#FFFFFF",
    primary: "#FF6F61",
  },
};

const App = () => {
  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#1F1F1F" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
          animation: "slide_from_right",
        }}
      >
    <Stack.Screen name="Login" component={Login} options={{ title: "Enter the Anime Realm" }} />
    <Stack.Screen name="Signup" component={Signup} options={{ title: "Join the Guild" }} />
<Stack.Screen name="Students" component={Students} options={{ title: "Student Zabfest" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const IP = "http://192.168.0.185";
export default App;
