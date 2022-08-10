import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { useAuthContext } from "./context/AuthContext";
import CreateAccountPage from "./pages/CreateAccountPage";
import UserInfo from "./pages/UserInfo";
import CommentsPage from "./pages/CommentsPage";
import AddCommentPage from "./pages/AddCommentPage";
import EditComment from "./pages/EditCommentPage";
import EditUserPage from "./pages/EditUserPage";
import AdminPage from "./pages/AdminPage";
import AdminRoute from "./routes/AdminRoute";
import RequireAuthRoute from "./routes/RequireAuthRoute";
import AdminOrSelfRoute from "./routes/AdminOrSelfRoute";
import AdminButNotSelfRoute from "./routes/AdminButNotSelfRoute";

function App() {
  const { currentUser, accountInfo } = useAuthContext();

  return (
    <div className="App">
      {accountInfo && <NavBar />}
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<SignUpPage />} />
        <Route element={<RequireAuthRoute />}>
          <Route path="home" element={<HomePage />} />
          <Route path="create-account/:id" element={<CreateAccountPage />} />
          <Route path="user-info">
            <Route path=":id" element={<UserInfo />} />
            <Route element={<AdminOrSelfRoute />}>
              <Route path=":id/edit" element={<EditUserPage />} />
            </Route>
          </Route>

          <Route path="comments">
            <Route element={<AdminOrSelfRoute />}>
              <Route path=":id" element={<CommentsPage />} />
            </Route>
            <Route element={<AdminButNotSelfRoute />}>
              <Route path=":id/edit/:cid" element={<EditComment />} />
              <Route path=":id/create" element={<AddCommentPage />} />
            </Route>
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
