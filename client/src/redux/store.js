import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import postSlice from "./post";
import friendsSlice from "./friends";
import messageSlice from "./message";
import commentSlice from "./comment";

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    friends: friendsSlice,
    message: messageSlice,
    comments: commentSlice,
  },
});

export default store;
