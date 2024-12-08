import { Stack } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors"; 
import { View, Text } from 'react-native'
import { Provider } from 'react-redux';
import { store } from '../store';
export default function RootLayout() {
  const colorScheme = useColorScheme(); 
  const themeColors = Colors[colorScheme]; 

  return (
  <Provider store={store}>
      
      {/* Dynamic StatusBar */}
      
      <StatusBar
        barStyle={colorScheme === "light" ? "dark-content" : "light-content"}
        backgroundColor={themeColors.background}
        hidden={false}
      />


      {/* Stack Navigation */}

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: themeColors.background },
        }}
      >
        <Stack.Screen name="(root)" />
      </Stack>
      
    
  </Provider>
  );
}
