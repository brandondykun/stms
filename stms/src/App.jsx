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

function App() {
  const { currentUser } = useAuthContext();

  return (
    <div className="App">
      {currentUser && <NavBar />}
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<SignUpPage />} />
        <Route path="create-account/:id" element={<CreateAccountPage />} />
        <Route path="user-info">
          <Route path=":id" element={<UserInfo />} />
          <Route path=":id/edit" element={<EditUserPage />} />
        </Route>
        <Route path="comments">
          <Route path=":id" element={<CommentsPage />} />
          <Route path=":id/edit/:cid" element={<EditComment />} />
          <Route path=":id/create" element={<AddCommentPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
