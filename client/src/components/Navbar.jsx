import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="logo">BookMyShow </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;