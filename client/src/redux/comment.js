import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../services/api/apiCall";

// Get related comments to the author for replies
export const getAllCommentByIDAsync = createAsyncThunk(
  "comment/getAllCommentByIDAsync",
  async ({ id }, ThunkAPI) => {
    try {
      const response = await apiCall.get(`/comment/${id}`);

      if (response.status === 200) {
        const { data } = response;
        return { data };
      }
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// make a reply on a comment
export const makeReplyOnCommentAsync = createAsyncThunk(
  "comment/makeReplyOnCommentAsync",
  async ({ comment_id, author, comment_text }, ThunkAPI) => {
    try {
      const response = await apiCall.post("/reply/comment", {
        comment_id,
        author,
        comment_text,
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

// get the main comment to make reply on
export const getMainCommentByIDAsync = createAsyncThunk(
  "comment/getMainCommentByIDAsync",
  async ({ id }, ThunkAPI) => {
    try {
      const response = await apiCall.get(`/author/comment/${id}`);

      if (response.status === 200) {
        const { data } = response;
        return { data };
      }
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    loading: false,
    author: null,
    comments: [],
  },
  reducers: {
    clearAuthor: (state) => {
      return { ...state, author: null };
    },
  },
  extraReducers: (builder) => {
    // make reply on a comment
    builder.addCase(makeReplyOnCommentAsync.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(makeReplyOnCommentAsync.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(makeReplyOnCommentAsync.rejected, (state) => {
      return { ...state, loading: false };
    });

    // get all related comments of the author
    builder.addCase(getAllCommentByIDAsync.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getAllCommentByIDAsync.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        comments: payload.data,
      };
    });
    builder.addCase(getAllCommentByIDAsync.rejected, (state) => {
      return { ...state, loading: false };
    });

    // get author comments for replies

    builder.addCase(getMainCommentByIDAsync.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getMainCommentByIDAsync.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        author: payload.data,
      };
    });
    builder.addCase(getMainCommentByIDAsync.rejected, (state) => {
      return { ...state, loading: false };
    });
  },
});

export const { clearAuthor } = commentSlice.actions;

export default commentSlice.reducer;
