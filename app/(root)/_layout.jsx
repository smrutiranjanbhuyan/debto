import { Stack, Tabs } from "expo-router";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";

export default function _layout() {
  const colorScheme = useColorScheme() || "light";
  const themeColors = Colors[colorScheme];

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: themeColors.tabIconSelected,
          tabBarInactiveTintColor: themeColors.tabIconDefault,
          tabBarStyle: {
            backgroundColor: themeColors.background,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={24} color={color} />
            ),
            accessibilityLabel: "Home Tab",
          }}
        />

        <Tabs.Screen
          name="transaction"
          options={{
            title: "Add Transaction",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="plus" size={24} color={color} />
            ),
            accessibilityLabel: "Transaction Tab",
          }}
        />

        <Tabs.Screen
          name="mintrans"
          options={{
            title: "Minimized Transactions",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="compress" size={24} color={color} />
            ),
            accessibilityLabel: "Minimized Transactions Tab",
          }}
        />

        <Tabs.Screen
          name="about"
          options={{
            title: "About Us",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="info-circle" size={24} color={color} />
            ),
            accessibilityLabel: "About Us Tab",
          }}
        />
      </Tabs>
    </>
  );
}
