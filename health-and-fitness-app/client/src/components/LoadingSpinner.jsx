function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className='feedback-state' role='status' aria-live='polite'>
      <span className='loading-spinner' aria-hidden='true' />
      <p className='feedback-message'>
        {message}
      </p>
    </div>
  );
}

export default LoadingSpinner;
