import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { setTotalSettled,addTransactions } from '../../store/slices/TransactionSlice';
import { MaterialIcons } from "@expo/vector-icons";
import SelectContact from "../../components/SelectContact";
import { useContacts } from "../../hooks/useContacts";
import CashFlowMinimizer from "debt-credit-balancer";
import { useDispatch,useSelector } from "react-redux";
import * as yup from "yup";
import { useNavigation } from "expo-router";

const Transaction = () => {

  const navigation = useNavigation();
  const [transactionData, setTransactionData] = useState([["", "", 0]]);
  const { contacts } = useContacts();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  // Validation schema using Yup
  const validationSchema = yup.object().shape({
    sender: yup.string().required("Sender is required"),
    receiver: yup.string().required("Receiver is required"),
    amount: yup
      .number()
      .positive("Amount must be a positive number")
      .required("Amount is required")
      .typeError("Amount must be a number"),
  });

  // Handle changes in input fields
  const handleChange = (index, field, value) => {
    const updatedData = [...transactionData];

    if (field === "amount") {
      const amount = parseFloat(value);
      updatedData[index][2] = !isNaN(amount) && amount > 0 ? amount : 0;
    } else {
      updatedData[index][field === "sender" ? 0 : 1] = value;
    }

    setTransactionData(updatedData);
  };

  // Handle adding new transaction fields
  const handleAddTransaction = () => {
    setTransactionData([...transactionData, ["", "", 0]]);
  };

  // Handle selecting a contact
  const handleSelectContact = (index, field, contact) => {
    const updatedData = [...transactionData];
    const contactId = contact ? contact.id : ""; // Ensure contact.id is being used
    updatedData[index][field === "sender" ? 0 : 1] = contactId;
    setTransactionData(updatedData);
  };

  // Handle deleting a transaction
  const handleDeleteTransaction = (index) => {
    const updatedData = transactionData.filter((_, i) => i !== index);
    setTransactionData(updatedData);
  };

  // Validate the transaction data
  const validateTransactionData = async () => {
    const newErrors = [];

    for (let i = 0; i < transactionData.length; i++) {
      const [sender, receiver, amount] = transactionData[i];

      try {
        await validationSchema.validate(
          {
            sender,
            receiver,
            amount,
          },
          { abortEarly: false }
        );
        newErrors.push({});
      } catch (err) {
        const fieldErrors = err.inner.reduce((acc, e) => {
          acc[e.path] = e.message;
          return acc;
        }, {});
        newErrors.push(fieldErrors);
      }
    }

    setErrors(newErrors);
    return newErrors.every((error) => Object.keys(error).length === 0);
  };

  const handleSubmit = async () => {
    const isValid = await validateTransactionData();
    if (isValid) {
      console.log("Transaction Data:", transactionData);
      const result = await CashFlowMinimizer.minCashFlow(transactionData);
 
      const { totalSettled, transactions } = result;

      dispatch(setTotalSettled(totalSettled));  
      dispatch(addTransactions(transactions));  

      navigation.navigate('mintrans');  
  
    } else {
      console.log("Form validation failed");
    }
  };
  

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={transactionData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Sender</Text>
          <SelectContact
            contacts={contacts}
            selectedContact={item[0]}
            onSelect={(contact) =>
              handleSelectContact(index, "sender", contact)
            }
          />
          {errors[index]?.sender && (
            <Text style={styles.errorText}>{errors[index]?.sender}</Text>
          )}

          <Text style={styles.label}>Receiver</Text>
          <SelectContact
            contacts={contacts}
            selectedContact={item[1]}
            onSelect={(contact) =>
              handleSelectContact(index, "receiver", contact)
            }
          />
          {errors[index]?.receiver && (
            <Text style={styles.errorText}>{errors[index]?.receiver}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={item[2].toString()}
            keyboardType="numeric"
            onChangeText={(value) => handleChange(index, "amount", value)}
          />
          {errors[index]?.amount && (
            <Text style={styles.errorText}>{errors[index]?.amount}</Text>
          )}

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteTransaction(index)}
          >
            <MaterialIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
      ListFooterComponent={
        <>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddTransaction}
          >
            <MaterialIcons name="add" size={24} color="white" />
          </TouchableOpacity>
          {transactionData.length === 0 ? (
            <Text style={styles.noDataText}>No transactions to submit</Text>
          ) : (
            <Button title="Calculate" onPress={handleSubmit} />
          )}
        </>
      }
    />
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28a745",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: "center",
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dc3545",
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    top: 5,
    right: 5,
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginBottom: 5,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginVertical: 20,
  },
});
