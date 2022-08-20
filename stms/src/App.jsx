import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import CreateAccountPage from "./pages/CreateAccountPage";
import UserInfo from "./pages/UserInfo";
import CommentsPage from "./pages/CommentsPage";
import AddCommentPage from "./pages/AddCommentPage";
import EditComment from "./pages/EditCommentPage";
import EditUserPage from "./pages/EditUserPage";
import AdminRoute from "./routes/AdminRoute";
import RequireAuthRoute from "./routes/RequireAuthRoute";
import AdminOrSelfRoute from "./routes/AdminOrSelfRoute";
import AdminButNotSelfRoute from "./routes/AdminButNotSelfRoute";
import UnAuthLayout from "./layouts/UnAuthLayout";
import WebsiteLayout from "./layouts/WebsiteLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminReassign from "./components/AdminReassign";
import AdminOverview from "./components/AdminOverview";
import EtsTime from "./components/EtsTime";
import Schools from "./components/Schools";
import DeleteAccount from "./components/DeleteAccount";
import DeleteCommentPage from "./pages/DeleteCommentPage";
import AddSchoolPage from "./pages/AddSchoolPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<UnAuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<SignUpPage />} />
        </Route>
        <Route element={<RequireAuthRoute />}>
          <Route element={<WebsiteLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="create-account/:id" element={<CreateAccountPage />} />
            <Route path="user-info">
              <Route path=":id" element={<UserInfo />} />
              <Route element={<AdminOrSelfRoute />}>
                <Route path=":id/edit" element={<EditUserPage />} />
                <Route path=":id/add-school" element={<AddSchoolPage />} />
              </Route>
            </Route>

            <Route path="comments">
              <Route element={<AdminOrSelfRoute />}>
                <Route path=":id" element={<CommentsPage />} />
              </Route>
              <Route element={<AdminButNotSelfRoute />}>
                <Route path=":id/edit/:cid" element={<EditComment />} />
                <Route
                  path=":id/edit/:cid/delete"
                  element={<DeleteCommentPage />}
                />
                <Route path=":id/create" element={<AddCommentPage />} />
              </Route>
            </Route>
          </Route>

          <Route path="admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="overview" element={<AdminOverview />} />
              <Route path="reassign" element={<AdminReassign />} />
              <Route path="ets" element={<EtsTime />} />
              <Route path="schools" element={<Schools />} />
              <Route path="delete-account" element={<DeleteAccount />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
