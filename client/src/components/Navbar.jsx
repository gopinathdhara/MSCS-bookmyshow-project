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
     <div className="logo">
  <Link to="/" className="logo-link">BookMyShow</Link>
</div>

      <div className="nav-links">
        {token ? (
          <>
            
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
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link> 
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
