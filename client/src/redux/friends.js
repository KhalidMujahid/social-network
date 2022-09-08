import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../services/api/apiCall";

// Get all users on the platform
export const getFriendsListAsync = createAsyncThunk(
  "friends/getFriendsListAsync",
  async (ThunkAPI) => {
    try {
      const response = await apiCall.get("/users");

      if (response.status === 200) {
        const { data } = response;
        return { data };
      }
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get all my friends on the platform
export const getMyFriendsListAsync = createAsyncThunk(
  "friends/getMyFriendsListAsync",
  async ({ author }, ThunkAPI) => {
    try {
      const response = await apiCall.get(`/my/friend/${author}`);

      if (response.status === 200) {
        const { data } = response;
        return { data };
      }
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    loading: false,
    friendList: [],
    chatList: [],
  },
  reducers: {
    clearList: (state) => {
      state.friendList = [];
    },
  },
  extraReducers: (builder) => {
    // Get all users on the platform
    builder.addCase(getFriendsListAsync.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getFriendsListAsync.fulfilled, (state, { payload }) => {
      return { loading: false, friendList: payload.data };
    });
    builder.addCase(getFriendsListAsync.rejected, (state) => {
      return { ...state, loading: false };
    });

    // Get my friends
    builder.addCase(getMyFriendsListAsync.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getMyFriendsListAsync.fulfilled, (state, { payload }) => {
      return { loading: false, chatList: payload.data };
    });
    builder.addCase(getMyFriendsListAsync.rejected, (state) => {
      return { ...state, loading: false };
    });
  },
});

export const { clearList } = friendsSlice.actions;

export default friendsSlice.reducer;
