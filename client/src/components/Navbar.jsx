import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { message } from "antd";
import { io } from "socket.io-client";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // =============== websocket implemntation ==================

  useEffect(() => {
    if (token && role === "admin") {
      //This creates connection Backend server URL where Socket.IO is running
      const socket = io(import.meta.env.VITE_API_BASE_URL);

      // join admin room
      socket.emit("join-admin");

      const handleNewBooking = (data) => {
        console.log("new-booking received:", data);

        const dateObj = new Date(data.Showdate);

        const formattedDate = dateObj.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        message.open({
          type: "success",
          content: `${data.movieTitle} booked at ${data.theatreName} on ${formattedDate} at ${data.time}`,
          duration: 15,
        });
      };

      // listen to event Frontend receives
      socket.on("new-booking", handleNewBooking);

      return () => {
        socket.off("new-booking", handleNewBooking);
      };
    }
  }, [token, role]);
  //====================================

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">
          BookMyShow
        </Link>
      </div>

      <div className="nav-links">
        {token ? (
          <>
            {role == "admin" ? (
              <>
                <NavLink
                  to="/admin"
                  className={({ isActive }) => (isActive ? "nav-active" : "")}
                  end
                >
                  Movies & Theatres
                </NavLink>
                <NavLink
                  to="/allbookings"
                  className={({ isActive }) => (isActive ? "nav-active" : "")}
                >
                  All bookings
                </NavLink>
              </>
            ) : (
              ""
            )}
            {role == "partner" ? (
              <>
                <NavLink
                  to="/partner"
                  className={({ isActive }) => (isActive ? "nav-active" : "")}
                >
                  Theatre & Shows
                </NavLink>
                <NavLink
                  to="/partner-bookings"
                  className={({ isActive }) => (isActive ? "nav-active" : "")}
                >
                  Bookings
                </NavLink>
              </>
            ) : (
              ""
            )}
            {role == "user" ? (
              <>
                <NavLink
                  to="/mybookings"
                  className={({ isActive }) => (isActive ? "nav-active" : "")}
                >
                  My Bookings
                </NavLink>
              </>
            ) : (
              ""
            )}

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "nav-active" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "nav-active" : "")}
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
