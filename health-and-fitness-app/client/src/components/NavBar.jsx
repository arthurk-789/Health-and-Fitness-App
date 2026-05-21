import { NavLink } from "react-router-dom";

function Navbar() {
  const baseLink = "nav-link";

  const activeLink = "nav-link--active";
  const inactiveLink = "nav-link--inactive";

  return (
    <nav className="navbar-shell">

      <div className="nav-title">
        FitnessHealth
      </div>

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/nutrition"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          Nutrition Lookup
        </NavLink>

        <NavLink
          to="/macros"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          Macros
        </NavLink>

      </div>
    </nav>
  );
}

export default Navbar;