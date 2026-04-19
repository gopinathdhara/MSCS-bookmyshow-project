import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import "./components/Navbar.css";
import Partner from "./pages/Partner";
import User from "./pages/User";
import TheatreShows from "./pages/TheatreShows";
import MovieDetails from "./pages/MovieDetails";
import BookShow from "./pages/BookShow";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";
import AdminBookings from "./pages/AdminBookings";
import PartnerBookings from "./pages/PartnerBookings";
import Forget from "./pages/ForgetPassword";
import Reset from "./pages/ResetPassword";
import AllMovies from "./pages/AllMovies";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
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
              path="/partner"
              element={
                <ProtectedRoute>
                  <Partner />
                </ProtectedRoute>
              }
            />
            <Route
              path="/partner/theatres/:theatreId/shows"
              element={
                <ProtectedRoute>
                  <TheatreShows />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movie/:movieId"
              element={
                <ProtectedRoute>
                  <MovieDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-show/:showId"
              element={
                <ProtectedRoute>
                  <BookShow />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mybookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/allbookings"
              element={
                <ProtectedRoute>
                  <AdminBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/partner-bookings"
              element={
                <ProtectedRoute>
                  <PartnerBookings />
                </ProtectedRoute>
              }
            />
            <Route path="/forget" element={<Forget />} />
            <Route path="/reset/:email" element={<Reset />} />
            <Route path="/movies" element={<AllMovies />} />
          </Routes>
        </div>

        <Footer />
      </div>
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
