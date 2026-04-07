import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import "./components/Navbar.css";
import EditMovie from "./pages/EditMovie";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-movie/:id"
          element={
            <ProtectedRoute>
              <EditMovie />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Pages folder
// Responsibilities:

// Pages folder represent application routes
// /login : Login
// /register : Register
// /admin : Admin
// Controls layout,high level page logic, trigger api calls

// Components folder
// Responsibilities:

// Components are
// Shared across pages
// Not tied to routes
// Reusable UI logic belongs here.

// API folder
// Responsibilities:

// Defining how the frontend talks to the backend.

// centralizing axios config
// Exposing function for API calls

// Each route maps a URL to a page

// 4 PAGES:

// 1. Home -> /
// 2. Login -> /login
// 3. Register -> /register
// 4. Admin -> /admin
