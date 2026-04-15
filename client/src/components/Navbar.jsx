import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

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
