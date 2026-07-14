function ErrorMessage({ message }) {
  return (
    <div className='feedback-message feedback-message--error' role='alert'>
      {message}
    </div>
  );
}

export default ErrorMessage;
