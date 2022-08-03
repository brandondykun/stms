import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { useAuthContext } from "./context/AuthContext";
import CreateAccountPage from "./pages/CreateAccountPage";

function App() {
  const { currentUser } = useAuthContext();
  console.log("CURRENT USER from APP: ", currentUser);

  return (
    <div className="App">
      {currentUser && <NavBar />}
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<SignUpPage />} />
        <Route path="create-account/:id" element={<CreateAccountPage />} />
      </Routes>
    </div>
  );
}

export default App;
