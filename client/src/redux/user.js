import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCall from "../services/api/apiCall";

// login
export const loginUserAsync = createAsyncThunk(
  "user/loginUserAsync",
  async ({ email, password }, ThunkAPI) => {
    try {
      const response = await apiCall.post("/login", {
        email,
        password,
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

// login with token
export const loginWithTokenUserAsync = createAsyncThunk(
  "user/loginWithTokenUserAsync",
  async ({ token }, ThunkAPI) => {
    try {
      const response = await apiCall.get("/login/token", {
        headers: {
          Authorization: `Bearer ${token}`,
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

// register
export const registerUserAsync = createAsyncThunk(
  "user/registerUserAsync",
  async ({ fname, lname, email, password }, ThunkAPI) => {
    try {
      const response = await apiCall.post("/register", {
        fname,
        lname,
        email,
        password,
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

// add friend
export const addFriendAsync = createAsyncThunk(
  "user",
  async ({ author, friend_id }, ThunkAPI) => {
    try {
      const response = await apiCall.put("/add/friend", {
        author,
        friend_id,
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

// get selected profile
export const getSelectedProfile = createAsyncThunk(
  "user/getSelectedProfile",
  async ({ id }, ThunkAPI) => {
    try {
      const response = await apiCall.get(`/profile/${id}`);

      if (response.status === 200) {
        const { data } = response;
        return { data };
      }
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// update profile
export const updateProfilePicture = createAsyncThunk(
  "user/updateProfilePicture",
  async ({ id, image }, ThunkAPI) => {
    try {
      const data = new FormData();
      data.append("image", image);
      const response = await apiCall.put(`/upload/profile/${id}`, data, {
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    profile: null,
  },
  reducers: {
    setSocketID: (state, { payload }) => {
      state.socketID = payload;
      console.log(payload);
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUserAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.data;
    });
    builder.addCase(registerUserAsync.rejected, (state) => {
      state.loading = false;
    });

    // login
    builder.addCase(loginUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUserAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.data;
    });
    builder.addCase(loginUserAsync.rejected, (state) => {
      state.loading = false;
    });

    // login with token
    builder.addCase(loginWithTokenUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginWithTokenUserAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.data;
    });
    builder.addCase(loginWithTokenUserAsync.rejected, (state) => {
      state.loading = false;
    });

    // add friend to my list
    builder.addCase(addFriendAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addFriendAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(addFriendAsync.rejected, (state) => {
      state.loading = false;
    });

    // get selected profile
    builder.addCase(getSelectedProfile.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getSelectedProfile.fulfilled, (state, { payload }) => {
      return { ...state, profile: payload.data, loading: false };
    });
    builder.addCase(getSelectedProfile.rejected, (state) => {
      return { ...state, loading: false };
    });

    // upload profile picture
    builder.addCase(updateProfilePicture.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(updateProfilePicture.fulfilled, (state, { payload }) => {
      return { loading: false, user: payload.data };
    });
    builder.addCase(updateProfilePicture.rejected, (state) => {
      return { ...state, loading: false };
    });
  },
});

export const { setSocketID, logoutUser } = userSlice.actions;

export default userSlice.reducer;
