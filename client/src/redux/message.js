import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../services/api/apiCall";

// get messages
export const getMessageAsync = createAsyncThunk(
  "message/getMessageAsync",
  async ({ from, to }, ThunkAPI) => {
    try {
      const response = await apiCall.post("/get/message", {
        from,
        to,
      });

      if (response.status === 200) {
        const { data } = response;
        return { data };
      }
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// send messages
export const sendMessageAsync = createAsyncThunk(
  "message/sendMessageAsync",
  async ({ from, to, message }, ThunkAPI) => {
    try {
      const response = await apiCall.post("/send/message", {
        from,
        to,
        message,
      });

      if (response.status === 200) {
        const { data } = response;
        return { data };
      }
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: null,
    loading: false,
  },
  reducers: {
    removeMessage: (state) => {
      return { ...state, messages: null };
    },
  },
  extraReducers: (builder) => {
    // Get message
    builder.addCase(getMessageAsync.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getMessageAsync.fulfilled, (state, { payload }) => {
      return { loading: false, messages: payload.data };
    });
    builder.addCase(getMessageAsync.rejected, (state) => {
      return { ...state, loading: false };
    });

    // send message
    builder.addCase(sendMessageAsync.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(sendMessageAsync.fulfilled, (state, { payload }) => {
      return { loading: false };
    });
    builder.addCase(sendMessageAsync.rejected, (state) => {
      return { ...state, loading: false };
    });
  },
});

export const { removeMessage } = messageSlice.actions;

export default messageSlice.reducer;
