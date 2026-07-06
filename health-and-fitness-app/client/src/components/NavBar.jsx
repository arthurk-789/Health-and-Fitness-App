import { NavLink } from 'react-router-dom';

function Navbar({ theme, onToggleTheme }) {
  const baseLink = 'nav-link';

  const activeLink = 'nav-link--active';
  const inactiveLink = 'nav-link--inactive';
  const profileBaseLink = 'profile-link';
  const activeProfileLink = 'profile-link--active';
  const inactiveProfileLink = 'profile-link--inactive';
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <nav className='navbar-shell'>

      <NavLink to='/' className='nav-title' aria-label='FitnessHealth home'>
        FitnessHealth
      </NavLink>

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

        <div className='nav-controls'>
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

          <NavLink
            to='/account'
            className={({ isActive }) =>
              `${profileBaseLink} ${isActive ? activeProfileLink : inactiveProfileLink}`
            }
            aria-label='Account'
          >
            <svg
              className='profile-link-icon'
              viewBox='0 0 24 24'
              aria-hidden='true'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M20 21a8 8 0 0 0-16 0' />
              <circle cx='12' cy='7' r='4' />
            </svg>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
