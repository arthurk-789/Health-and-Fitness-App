import { NavLink } from "react-router-dom";

function Navbar() {
  const baseLink = "transition-colors";

  const activeLink = "text-blue-400 font-semibold";
    
  const inactiveLink = "text-white hover:text-blue-400";

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md">

      <div className="text-lg font-bold tracking-wide text-white">
        FitnessHealth
      </div>

      <div className="flex gap-6 text-sm">
        
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
          Nutrition
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