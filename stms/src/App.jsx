import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
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
import EditSchoolPage from "./pages/EditSchoolPage";
import DeleteSchoolPage from "./pages/DeleteSchoolPage";
import RecommendedCommentPage from "./pages/RecommendedCommentPage";
import EditRecommendedCommentPage from "./pages/EditRecommendedCommentPage";
import SelfRoute from "./routes/SelfRoute";
import TestLandingPage from "./pages/TestLandingPage";
import ExamQuestionPage from "./pages/ExamQuestionPage/ExamQuestionPage";

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
                <Route
                  path=":id/edit-school/:sid"
                  element={<EditSchoolPage />}
                />
                <Route
                  path=":id/edit-school/:sid/delete"
                  element={<DeleteSchoolPage />}
                />
              </Route>
            </Route>

            <Route path="comments">
              <Route element={<AdminOrSelfRoute />}>
                <Route path=":id" element={<CommentsPage />} />
                <Route element={<SelfRoute />}>
                  <Route
                    path=":id/add-recommended-comment"
                    element={<RecommendedCommentPage />}
                  />
                  <Route
                    path=":id/edit-recommended/:cid"
                    element={<EditRecommendedCommentPage />}
                  />
                  <Route
                    path=":id/edit/:cid/delete-recommended-comment"
                    element={<DeleteCommentPage />}
                  />
                </Route>
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

            <Route path="exam">
              <Route path="landing" element={<TestLandingPage />} />
              <Route path="question/:qid" element={<ExamQuestionPage />} />
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
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
