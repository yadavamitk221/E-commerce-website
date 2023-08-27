import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders } from './userAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
};


export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be different of more info from loggedInInfo
        state.userOrders = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;
export const selectUserOrder = (state) => state.user.userOrders;



export default userSlice.reducer;
