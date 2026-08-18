import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const themeOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'sunset', label: 'Sunset' },
  { value: 'violet', label: 'Violet' },
];

function Navbar({ theme, onThemeChange }) {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef(null);
  const baseLink = 'nav-link';

  const activeLink = 'nav-link--active';
  const inactiveLink = 'nav-link--inactive';
  const profileBaseLink = 'profile-link';
  const activeProfileLink = 'profile-link--active';
  const inactiveProfileLink = 'profile-link--inactive';
  const selectedTheme = themeOptions.find((option) => option.value === theme);

  useEffect(() => {
    if (!isThemeMenuOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!themeMenuRef.current?.contains(event.target)) {
        setIsThemeMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsThemeMenuOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isThemeMenuOpen]);

  function selectTheme(nextTheme) {
    onThemeChange(nextTheme);
    setIsThemeMenuOpen(false);
  }

  return (
    <nav className='navbar-shell'>
      <div className='nav-brand'>
        <NavLink to='/' className='nav-title' aria-label='FitnessHealth home'>
          FitnessHealth
        </NavLink>

        <NavLink
          to='/'
          className={({ isActive }) =>
            `nav-home-link ${isActive ? 'nav-home-link--active' : ''}`
          }
          aria-label='Home'
        >
          <svg
            className='nav-home-icon'
            viewBox='0 0 24 24'
            aria-hidden='true'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m3 11 9-8 9 8' />
            <path d='M5 10v11h14V10' />
            <path d='M9 21v-7h6v7' />
          </svg>
        </NavLink>
      </div>

      <div className='nav-links'>
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

        <NavLink
          to='/calories-burned'
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          Calories Burned
        </NavLink>
      </div>

      <div className='nav-controls'>
        <div className='theme-menu' ref={themeMenuRef}>
            <button
              type='button'
              className={`theme-button ${isThemeMenuOpen ? 'theme-button--open' : ''}`}
              onClick={() => setIsThemeMenuOpen((isOpen) => !isOpen)}
              aria-haspopup='menu'
              aria-expanded={isThemeMenuOpen}
              aria-controls='theme-options'
            >
              <svg
                className='theme-button-icon'
                viewBox='0 0 24 24'
                aria-hidden='true'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='13.5' cy='6.5' r='1.5' />
                <circle cx='17.5' cy='10.5' r='1.5' />
                <circle cx='8.5' cy='7.5' r='1.5' />
                <circle cx='6.5' cy='12.5' r='1.5' />
                <path d='M12 2a10 10 0 0 0 0 20h1.7a2.3 2.3 0 0 0 1.8-3.7 2.3 2.3 0 0 1 1.8-3.7H19a3 3 0 0 0 3-3A9.6 9.6 0 0 0 12 2Z' />
              </svg>
              <span>Theme</span>
              <span className='theme-button-current'>{selectedTheme?.label}</span>
              <svg
                className={`theme-button-chevron ${isThemeMenuOpen ? 'theme-button-chevron--open' : ''}`}
                viewBox='0 0 20 20'
                aria-hidden='true'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='m6 8 4 4 4-4' />
              </svg>
            </button>

            {isThemeMenuOpen && (
              <div className='theme-options' id='theme-options' role='menu'>
                <span className='theme-options-label'>Choose a theme</span>
                {themeOptions.map((option) => {
                  const isActive = option.value === theme;

                  return (
                    <button
                      type='button'
                      key={option.value}
                      className={`theme-option ${isActive ? 'theme-option--active' : ''}`}
                      onClick={() => selectTheme(option.value)}
                      role='menuitemradio'
                      aria-checked={isActive}
                    >
                      <span className={`theme-option-swatch theme-option-swatch--${option.value}`} />
                      <span>{option.label}</span>
                      {isActive && (
                        <svg
                          className='theme-option-check'
                          viewBox='0 0 20 20'
                          aria-hidden='true'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='m5 10 3 3 7-7' />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
        </div>

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
    </nav>
  );
}

export default Navbar;
