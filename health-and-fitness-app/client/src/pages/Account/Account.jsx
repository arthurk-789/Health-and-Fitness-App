import { useState } from 'react';

const initialLoginForm = {
  username: '',
  password: ''
};

const initialSignupForm = {
  username: '',
  password: '',
  confirmPassword: ''
};

function Account() {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [signupForm, setSignupForm] = useState(initialSignupForm);

  const isLogin = activeTab === 'login';

  function handleLoginChange(e) {
    const { name, value } = e.target;

    setLoginForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  }

  function handleSignupChange(e) {
    const { name, value } = e.target;

    setSignupForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    console.log('Login form submitted:', loginForm);
  }

  function handleSignupSubmit(e) {
    e.preventDefault();
    console.log('Signup form submitted:', signupForm);
  }

  return (
    <main className='account-page'>
      <section className='account-card' aria-labelledby='account-title'>
        <div className='account-card-header'>
          <p className='account-eyebrow'>Account</p>

          <h1 id='account-title' className='account-title'>
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>

          <p className='account-subtitle'>
            {isLogin
              ? 'Log in to continue your health and fitness dashboard.'
              : 'Set up your dashboard profile with a username and password.'
            }
          </p>
        </div>

        <div className='account-tabs' role='tablist' aria-label='Account form'>
          <button
            type='button'
            role='tab'
            aria-selected={isLogin}
            className={`account-tab ${isLogin ? 'account-tab--active' : 'account-tab--inactive'}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>

          <button
            type='button'
            role='tab'
            aria-selected={!isLogin}
            className={`account-tab ${!isLogin ? 'account-tab--active' : 'account-tab--inactive'}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <form className='account-form' onSubmit={handleLoginSubmit}>
            <div className='account-field'>
              <label htmlFor='login-username' className='account-label'>
                Username
              </label>
              <input
                id='login-username'
                name='username'
                type='text'
                value={loginForm.username}
                onChange={handleLoginChange}
                placeholder='Enter your username'
                autoComplete='username'
                className='account-input'
                required
              />
            </div>

            <div className='account-field'>
              <label htmlFor='login-password' className='account-label'>
                Password
              </label>
              <input
                id='login-password'
                name='password'
                type='password'
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder='Enter your password'
                autoComplete='current-password'
                className='account-input'
                required
              />
            </div>

            <button type='submit' className='account-submit-button'>
              Login
            </button>
          </form>
        ) : (
          <form className='account-form' onSubmit={handleSignupSubmit}>
            <div className='account-field'>
              <label htmlFor='signup-username' className='account-label'>
                Username
              </label>
              <input
                id='signup-username'
                name='username'
                type='text'
                value={signupForm.username}
                onChange={handleSignupChange}
                placeholder='Choose a username'
                autoComplete='username'
                className='account-input'
                required
              />
            </div>

            <div className='account-field'>
              <label htmlFor='signup-password' className='account-label'>
                Password
              </label>
              <input
                id='signup-password'
                name='password'
                type='password'
                value={signupForm.password}
                onChange={handleSignupChange}
                placeholder='Create a password'
                autoComplete='new-password'
                className='account-input'
                required
              />
            </div>

            <div className='account-field'>
              <label htmlFor='signup-confirm-password' className='account-label'>
                Confirm password
              </label>
              <input
                id='signup-confirm-password'
                name='confirmPassword'
                type='password'
                value={signupForm.confirmPassword}
                onChange={handleSignupChange}
                placeholder='Confirm your password'
                autoComplete='new-password'
                className='account-input'
                required
              />
            </div>

            <button type='submit' className='account-submit-button'>
              Create Account
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

export default Account;
