import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/UserSlice'
import transactionsSlice from './slices/TransactionSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    transaction: transactionsSlice,
  },
});
