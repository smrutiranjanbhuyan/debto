import React from "react";
import { Text, View, Button, StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation } from "expo-router";
export default function Index() {
  const navigater=useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={require("../../assets/images/hero.jpg")}
          style={styles.heroImage}
        />
        <Text style={styles.heroTitle}>Welcome to Debto </Text>
        <Text style={styles.heroDescription}>
        Effortlessly Balance Debts, Minimize Transactions.
        </Text>
        <Button title="Get Started" onPress={() => navigater.navigate('transaction')} />
      </View>

      {/* Features Section (Placeholder for now) */}
      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>Features</Text>
        <Text style={styles.featuresDescription}>
        Minimize and Optimize Debt Transactions: Automatically minimizes the number of transactions required to settle debts between multiple parties, helping you save time and effort.
        </Text>
      </View>

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f8f8",
    paddingBottom: 20,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498db",
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 30,
  },
  heroImage: {
    width: "100%",
    height: 220, 
    borderRadius: 15,
    marginBottom: 20,
  },
  heroTitle: { 
    fontWeight: "bold",
    fontSize: 34,
    color: "#fff",
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 30, 
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  featuresDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
});
