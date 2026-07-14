function EmptyState({ title, message }) {
  return (
    <div className='empty-state'>
      <div className='empty-state-icon' aria-hidden='true'>
        +
      </div>

      <div>
        {title && (
          <h2 className='empty-state-title'>
            {title}
          </h2>
        )}

        {message && (
          <p className='empty-state-message'>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
