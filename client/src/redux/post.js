import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../services/api/apiCall";
// get all post
export const getPostAsync = createAsyncThunk(
  "post/getPostAsync",
  async (ThunkAPI) => {
    try {
      const response = await apiCall.get("/posts");

      if (response.status === 200) {
        const { data } = response;
        return { data };
      }
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// make comment
export const handleCommentAsync = createAsyncThunk(
  "post/handleCommentAsync",
  async ({ author, post_id, text_content }, ThunkAPI) => {
    try {
      const response = await apiCall.post("/create/comment", {
        author,
        post_id,
        text_content,
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

// get single post
export const getSinglePostAsync = createAsyncThunk(
  "post/getSinglePostAsync",
  async ({ id }, ThunkAPI) => {
    try {
      const response = await apiCall.get(`/post/${id}`);

      if (response.status === 200) {
        const { data } = response;
        return { data };
      }
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// add new post
export const addNewPostAsync = createAsyncThunk(
  "post/addNewPostAsync",
  async ({ content, author, post_image }, ThunkAPI) => {
    try {
      const data = new FormData();
      data.append("author", author);
      data.append("image", post_image);
      data.append("content", content);

      const response = await apiCall.post("/create/new/post", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

// like and unlike a post
export const likeAndUnlikeAPost = createAsyncThunk(
  "post/likeAndUnlikeAPost",
  async ({ author, post_id }, ThunkAPI) => {
    try {
      const response = await apiCall.put("/like", {
        author,
        post_id,
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

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    singlePost: null,
    loading: false,
  },
  reducers: {
    clearSinglePost: (state) => {
      return { ...state, singlePost: null };
    },
  },
  extraReducers: (builder) => {
    // Get all post
    builder.addCase(getPostAsync.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getPostAsync.fulfilled, (state, { payload }) => {
      return { loading: false, post: payload.data };
    });
    builder.addCase(getPostAsync.rejected, (state) => {
      return { ...state, loading: false };
    });

    // Get single post
    builder.addCase(getSinglePostAsync.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getSinglePostAsync.fulfilled, (state, { payload }) => {
      return { ...state, loading: false, singlePost: payload.data };
    });
    builder.addCase(getSinglePostAsync.rejected, (state) => {
      return { ...state, loading: false };
    });

    // Create new post
    builder.addCase(addNewPostAsync.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(addNewPostAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.post.unshift(payload.data);
    });
    builder.addCase(addNewPostAsync.rejected, (state) => {
      return { ...state, loading: false };
    });

    // Comment on a post
    builder.addCase(handleCommentAsync.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(handleCommentAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.singlePost?.comments?.unshift(payload.data);
    });
    builder.addCase(handleCommentAsync.rejected, (state) => {
      return { ...state, loading: false };
    });

    // like or unlike a post
    builder.addCase(likeAndUnlikeAPost.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(likeAndUnlikeAPost.fulfilled, (state) => {
      return { ...state, loading: false };
    });
    builder.addCase(likeAndUnlikeAPost.rejected, (state) => {
      return { ...state, loading: false };
    });
  },
});

export const { clearSinglePost } = postSlice.actions;
export default postSlice.reducer;
