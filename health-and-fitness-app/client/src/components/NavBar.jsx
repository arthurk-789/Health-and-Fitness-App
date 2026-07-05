import { NavLink } from 'react-router-dom';

function Navbar({ theme, onToggleTheme }) {
  const baseLink = 'nav-link';

  const activeLink = 'nav-link--active';
  const inactiveLink = 'nav-link--inactive';
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <nav className='navbar-shell'>

      <div className='nav-title'>
        FitnessHealth
      </div>

      <div className='nav-actions'>
        <div className='nav-links'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to='/nutrition'
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            Nutrition Lookup
          </NavLink>

          <NavLink
            to='/macros'
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            Macro Calculator
          </NavLink>

          <NavLink
            to='/meal-builder'
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : inactiveLink}`
            }
          >
            Meal Builder
          </NavLink>

        </div>

        <button
          type='button'
          className='theme-toggle'
          onClick={onToggleTheme}
          aria-label={`Switch to ${nextTheme} mode`}
        >
          <span className='theme-toggle-track'>
            <span className='theme-toggle-thumb' />
          </span>
          <span className='theme-toggle-label'>
            {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
