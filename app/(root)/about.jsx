import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import React from 'react';

export default function About() {
  const openGithub = () => {
    Linking.openURL('https://github.com/smrutiranjanbhuyan/cash-flow-minimizer');
  };

  const openNpm = () => {
    Linking.openURL('https://www.npmjs.com/package/debt-credit-balancer');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>About Us</Text>
      
      <Text style={styles.description}>
        Cash Flow Minimizer is a tool designed to simplify debt management. It reduces the number of transactions required to settle debts, making it easier to balance financial obligations between multiple parties. This streamlined approach ensures efficiency and transparency in managing finances.
      </Text>
      
      <Text style={styles.subtitle}>Key Features</Text>
      <View style={styles.featuresContainer}>
        <Text style={styles.features}>- Transaction Minimization: Reduces the number of transactions needed to settle debts.</Text>
        <Text style={styles.features}>- Customizable Setup: Adapts to any financial scenario with ease.</Text>
        <Text style={styles.features}>- Seamless Integration: Easy integration with Node.js for developers.</Text>
      </View>
      
      <Text style={styles.subtitle}>How It Works</Text>
      <Text style={styles.description}>
        The algorithm calculates the net balance for each participant, then optimally matches creditors and debtors to minimize the number of transactions required. This ensures that all debts are settled efficiently.
      </Text>
      
      <Text style={styles.subtitle}>Getting Started</Text>
      <Text style={styles.description}>
        To get started, simply install the package via npm and follow the usage instructions. It's designed to be quick to implement and fully customizable.
      </Text>
      
      <TouchableOpacity onPress={openNpm} style={styles.linkButton}>
        <Text style={styles.linkText}>Install on NPM</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Contributing</Text>
      <Text style={styles.description}>
        We welcome contributions! If you find bugs, suggest new features, or want to help, please open an issue or submit a pull request on GitHub.
      </Text>
      
      <TouchableOpacity onPress={openGithub} style={styles.linkButton}>
        <Text style={styles.linkText}>Visit our GitHub</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    paddingBottom: 80, 
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2980b9',
    marginTop: 25,
    marginBottom: 10,
  },
  featuresContainer: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  features: {
    fontSize: 16,
    color: '#34495e',
    marginLeft: 10,
    lineHeight: 24,
  },
  linkButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: '#3498db',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  linkText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});