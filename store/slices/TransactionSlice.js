import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  totalSettled: 0,
  transactions: [],
};

const persistState = async (state) => {
  try {
    await AsyncStorage.setItem('transactionsState', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state:', error);
  }
};

const loadState = async () => {
  try {
    const storedState = await AsyncStorage.getItem('transactionsState');
    return storedState ? JSON.parse(storedState) : initialState;
  } catch (error) {
    console.error('Failed to load state:', error);
    return initialState;
  }
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTotalSettled: (state, action) => {
      state.totalSettled = action.payload;
      persistState(state); 
    },
    addTransactions: (state, action) => {
      state.transactions = action.payload;
      persistState(state); 
    },
    clearTransactions: (state) => {
      state.totalSettled = 0;
      state.transactions = [];
      persistState(state);
    },
  },
});

export const { setTotalSettled, addTransactions, clearTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
