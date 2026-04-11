import { Link, useNavigate } from "react-router-dom";

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
      <div className="logo">BookMyShow </div>

      <div className="nav-links">
        {token ? (
          <>
            <Link to="/">Home</Link>
            { role == "admin" ? (
              <>
                <Link to="/admin">Admin</Link>
              </>
            ) : (
              ""
            )}
            { role == "partner" ? (
              <>
                <Link to="/partner">Partner</Link>
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
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
