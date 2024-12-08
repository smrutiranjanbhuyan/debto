import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contactNumber: '7978766971',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setContactNumber: (state, action) => {
      state.contactNumber = action.payload;
    },
    clearContactNumber: (state) => {
      state.contactNumber = '';
    },
  },
});

export const { setContactNumber, clearContactNumber } = userSlice.actions;
export default userSlice.reducer;
