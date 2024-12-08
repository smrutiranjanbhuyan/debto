import React from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MinimizeTransaction from "../../components/MinimizeTransaction";
import { clearTransactions } from "../../store/slices/TransactionSlice"; 

const MinTrans = () => {
  const data = useSelector((state) => state.transaction);
  const dispatch = useDispatch(); 
  
  const handleClearTransactions = () => {
    dispatch(clearTransactions()); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minimized Transactions</Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <MinimizeTransaction data={data} />
      </ScrollView>
      
      {/* Clear Transaction Button */}
      <Button 
        title="Clear Transactions" 
        onPress={handleClearTransactions} 
        color="#dc3545" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

export default MinTrans;
