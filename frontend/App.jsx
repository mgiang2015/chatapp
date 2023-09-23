import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import Component from "./components/MyComponent";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, Button } from "@rneui/themed";
import AppConst from "./assets/const"
import Welcome from "./pages/Welcome";
import ChatRoom from "./pages/ChatRoom";


const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AppConst.NAME_WELCOME_PAGE}>
          <Stack.Screen name={AppConst.NAME_WELCOME_PAGE} component={Welcome} />
          <Stack.Screen name={AppConst.NAME_CHATROOM_PAGE} component={ChatRoom} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
