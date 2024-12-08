import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectContact = ({ contacts, onSelect }) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleSelect = (value) => {
    setSelectedContact(value);
    const contact = contacts.find((c) => c.id === value);
    onSelect(contact);  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a contact</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedContact} 
          onValueChange={handleSelect}
          style={styles.picker}
        >
          <Picker.Item label="Select a contact" value={null} />
          {contacts.map((contact) => (
            <Picker.Item key={contact.id} label={contact.name} value={contact.id} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default SelectContact;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  pickerContainer: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    overflow: 'hidden', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    color: '#333',
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 0, 
 
  },
});
