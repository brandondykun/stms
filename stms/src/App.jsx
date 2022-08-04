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

function App() {
  const { currentUser } = useAuthContext();

  return (
    <div className="App">
      {currentUser && <NavBar />}
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<SignUpPage />} />
        <Route path="user-info/:id" element={<UserInfo />} />
        <Route path="comments/:id" element={<CommentsPage />} />
        <Route path="comments/:id/edit/:cid" element={<EditComment />} />
        <Route path="add-comment/:id" element={<AddCommentPage />} />
        <Route path="create-account/:id" element={<CreateAccountPage />} />
      </Routes>
    </div>
  );
}

export default App;
