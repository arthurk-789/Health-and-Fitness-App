function SuccessMessage({ message }) {
  return (
    <div className='feedback-message feedback-message--success' role='status' aria-live='polite'>
      {message}
    </div>
  );
}

export default SuccessMessage;
