import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <div className="p-4 max-w-2xl mx-auto">
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={token ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={token ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
