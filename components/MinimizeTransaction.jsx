import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from "react-native";
import * as Contacts from "expo-contacts";
import * as SMS from "expo-sms";
import * as Linking from "expo-linking";  
import { MaterialCommunityIcons, FontAwesome } from "react-native-vector-icons";

const MinimizeTransaction = ({ data }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load contacts from the phone
  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      setContacts(data);
      setLoading(false);
    } else {
      setError("Permission to access contacts denied.");
      setLoading(false);
    }
  };

  // Send SMS to sender phone
  const sendMessage = async (senderName, senderPhone, receiverName, receiverPhone, amount) => {
    const messageDate = new Date().toLocaleString(); 
    const message = `Hello ${senderName},\n\nPlease transfer ₹${amount} to ${receiverName} (${receiverPhone}).\n\nThank you!\nDate: ${messageDate}
    `;

    const { result } = await SMS.sendSMSAsync(senderPhone, message); 
    if (result == "sent") {
      Alert.alert("Message Sent", "Your message was successfully sent.");
    } 
  };

  // Send WhatsApp message function
  const sendWhatsAppMessage = (receiverPhone, message) => {
    const url = `whatsapp://send?phone=${receiverPhone}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "WhatsApp is not installed on your device.");
    });
  };

  // Get contact information based on contact ID
  const getContactInfo = (id) => {
    const contact = contacts.find((contact) => contact.id === id);
    return contact ? { name: contact.name, phone: contact.phoneNumbers[0]?.number } : { name: "Unknown", phone: null };
  };

  useEffect(() => {
    loadContacts(); 
  }, [data]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading contacts...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error loading contacts: {error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.summary}>Total Settled: ₹{data.totalSettled}</Text>

      {data.transactions.map((transaction, index) => {
        const senderInfo = getContactInfo(transaction.from);
        const receiverInfo = getContactInfo(transaction.to);

        return (
          <View key={index} style={styles.transactionCard}>
            <Text style={[styles.transactionText, styles.sender]}>
              {senderInfo.name} sent ₹{transaction.amount} to
            </Text>
            <Text style={[styles.transactionText, styles.receiver]}>
              {receiverInfo.name}
            </Text>
            
            <View style={styles.iconContainer}>
              {senderInfo.phone && receiverInfo.phone && (
                <>
                  <TouchableOpacity 
                    style={styles.messageButton} 
                    onPress={() => sendMessage(senderInfo.name, senderInfo.phone, receiverInfo.name, receiverInfo.phone, transaction.amount)}
                  >
                    <MaterialCommunityIcons name="message-text" size={30} color="#fff" />
                  </TouchableOpacity>

                  {/* WhatsApp button */}
                  <TouchableOpacity 
                    style={styles.messageButton} 
                    onPress={() => {
                      const messageDate = new Date().toLocaleString();  
                      sendWhatsAppMessage(
                        senderInfo.phone,
                        `Hi ${senderInfo.name},\n\nKindly transfer ₹${transaction.amount} to ${receiverInfo.name} (${receiverInfo.phone}) at your earliest convenience.\n\nThank you! \nDate: ${messageDate}`
                      );
                    }}
                    
                  >
                    <FontAwesome name="whatsapp" size={30} color="#fff" />
                  </TouchableOpacity>
                </>
              )}

              {/* Checkmark for completed transaction */}
              {transaction.completed && (
                <MaterialCommunityIcons name="check-circle" size={30} color="#28A745" />
              )}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  summary: {
    fontSize: 20,
    marginBottom: 20,
    color: "#333",
    fontWeight: "700",
  },
  transactionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    transition: "all 0.3s ease",
  },
  transactionCardHovered: {
    shadowOpacity: 0.3,
  },
  transactionText: {
    fontSize: 16,
    color: "#333",
  },
  sender: {
    color: "#FF5733",
    fontWeight: "700",
  },
  receiver: {
    color: "#28A745", 
    fontWeight: "700",
  },
  messageButton: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    borderRadius: 30,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
    marginRight: 10,
    elevation: 5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default MinimizeTransaction;
