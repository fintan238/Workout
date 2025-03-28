import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uid: null,
  name: null,
  email: null,
  photoUrl: null,
  createdAt: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photoUrl = action.payload.photoUrl;
      state.createdAt = action.payload.createdAt;
    },
  },
});

export const selectUser = (state) => state.user;
export const { setUser } = userSlice.actions;
export default userSlice.reducer;