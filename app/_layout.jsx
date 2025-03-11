import { Stack } from "expo-router";
import { StatusBar, useColorScheme, View, Text } from "react-native";
import { Colors } from "../constants/Colors";
import { Provider } from 'react-redux';
import { store } from '../store';
import { useState, useEffect } from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];
  
  const [showFlash, setShowFlash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFlash(false); 
    }, 2000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <Provider store={store}>
      {/* Dynamic StatusBar */}
      <StatusBar
        barStyle={colorScheme === "light" ? "dark-content" : "light-content"}
        backgroundColor={themeColors.background}
        hidden={false}
      />

      {/* Flash Screen */}
      {showFlash && (
        <View
          style={{
            position: 'absolute', 
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: themeColors.primary, 
          }}
        >
          <Text style={{ color: 'white', fontSize: 24 }}>Welcome to the App!</Text>
        </View>
      )}

      {/* Main Content */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: themeColors.background },
        }}
      >
        {!showFlash && <Stack.Screen name="(root)" />}
      </Stack>
    </Provider>
  );
}
