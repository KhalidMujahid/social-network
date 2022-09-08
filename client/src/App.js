import { Route, Routes } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import ProtectedRoute from "./components/ProtectedRoute";
import ReplyComment from "./components/ReplyComment";
import SelectedPost from "./components/SelectedPost";
import Friends from "./pages/Friends/Friends";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Menu from "./pages/Menu/Menu";
import Messenger from "./pages/Messenger/Messenger";
import Profile from "./pages/Profile/Profile";
import SelectedProfile from "./pages/Profile/SelectedProfile";
import Regsiter from "./pages/Register/Regsiter";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="" element={<Home />} />
          <Route path="post/:id" element={<SelectedPost />} />
          <Route path="comment/:id" element={<ReplyComment />} />
          <Route path="messenger" element={<Messenger />} />
          <Route path="friends" element={<Friends />} />
          <Route path="/messenge/chat/:id" element={<ChatBox />} />
          <Route path="/profile/:id" element={<SelectedProfile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="menu" element={<Menu />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Regsiter />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
