import { useEffect, useState } from 'react';
import {
  NUMBER_FORMAT_OPTIONS,
  SERVING_UNIT_OPTIONS,
  THEME_OPTIONS,
} from '../utils/preferences';

function Settings({ preferences, onSave }) {
  const [draftPreferences, setDraftPreferences] = useState(preferences);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setDraftPreferences((currentDraft) => ({
      ...currentDraft,
      theme: preferences.theme,
    }));
  }, [preferences.theme]);

  const hasChanges = JSON.stringify(draftPreferences) !== JSON.stringify(preferences);

  function updatePreference(name, value) {
    setDraftPreferences((currentPreferences) => ({
      ...currentPreferences,
      [name]: value,
    }));
    setStatus('');
    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (draftPreferences.weight !== '' && Number(draftPreferences.weight) <= 0) {
      setError('Enter a weight greater than zero or leave the field blank.');
      setStatus('');
      return;
    }

    onSave(draftPreferences);
    setError('');
    setStatus('Your preferences have been saved.');
  }

  return (
    <main className='settings-page'>
      <div className='settings-container'>
        <header className='settings-header'>
          <p className='settings-eyebrow'>Personalize your experience</p>
          <div className='settings-header-row'>
            <div>
              <h1 id='settings-title' className='settings-title'>Settings</h1>
              <p className='settings-description'>
                Choose how the app looks, feels, and preloads your health information.
              </p>
            </div>

            <div className='settings-actions'>
              <div className='settings-message' aria-live='polite'>
                {error && <p className='settings-message--error'>{error}</p>}
                {status && <p className='settings-message--success'>{status}</p>}
                {!error && !status && hasChanges && <p>You have unsaved changes.</p>}
              </div>
              <button
                type='submit'
                form='preferences-form'
                className='settings-save-button'
                disabled={!hasChanges}
              >
                Save preferences
              </button>
            </div>
          </div>
        </header>

        <form
          id='preferences-form'
          className='settings-form'
          onSubmit={handleSubmit}
          aria-labelledby='settings-title'
        >
          <section className='settings-section' aria-labelledby='appearance-heading'>
            <div className='settings-section-header'>
              <div>
                <h2 id='appearance-heading' className='settings-section-title'>Appearance</h2>
                <p className='settings-section-description'>
                  Select a color theme and control interface motion.
                </p>
              </div>
            </div>

            <fieldset className='settings-fieldset'>
              <legend className='settings-label'>Theme</legend>
              <div className='settings-theme-grid'>
                {THEME_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className={`settings-choice settings-theme-choice ${
                      draftPreferences.theme === option.value ? 'settings-choice--selected' : ''
                    }`}
                  >
                    <input
                      type='radio'
                      name='theme'
                      value={option.value}
                      checked={draftPreferences.theme === option.value}
                      onChange={(event) => updatePreference('theme', event.target.value)}
                      className='settings-choice-input'
                    />
                    <span
                      className={`theme-option-swatch theme-option-swatch--${option.value}`}
                      aria-hidden='true'
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className='settings-toggle-row'>
              <span>
                <span className='settings-toggle-title'>Reduce animations and transitions</span>
                <span className='settings-toggle-description'>
                  Minimize motion throughout navigation, cards, and loading indicators.
                </span>
              </span>
              <span className='settings-toggle'>
                <input
                  type='checkbox'
                  checked={draftPreferences.reduceMotion}
                  onChange={(event) => updatePreference('reduceMotion', event.target.checked)}
                  className='settings-toggle-input'
                />
                <span className='settings-toggle-control' aria-hidden='true'>
                  <span className='settings-toggle-thumb' />
                </span>
              </span>
            </label>
          </section>

          <div className='settings-grid'>
            <section className='settings-section' aria-labelledby='defaults-heading'>
              <div className='settings-section-header'>
                <div>
                  <h2 id='defaults-heading' className='settings-section-title'>Health defaults</h2>
                  <p className='settings-section-description'>
                    Preload common values when opening a calculator.
                  </p>
                </div>
              </div>

              <div className='settings-field-group'>
                <label htmlFor='preferred-weight' className='settings-label'>Weight (lbs)</label>
                <input
                  id='preferred-weight'
                  type='number'
                  min='1'
                  step='any'
                  value={draftPreferences.weight}
                  onChange={(event) => updatePreference('weight', event.target.value)}
                  placeholder='e.g., 165'
                  className='settings-input'
                  aria-describedby='preferred-weight-help'
                />
                <p id='preferred-weight-help' className='settings-help-text'>
                  Used by the Macro Calculator and Calories Burned pages.
                </p>
              </div>

              <fieldset className='settings-fieldset'>
                <legend className='settings-label'>Preferred serving unit</legend>
                <div className='settings-choice-list'>
                  {SERVING_UNIT_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={`settings-choice ${
                        draftPreferences.servingUnit === option.value
                          ? 'settings-choice--selected'
                          : ''
                      }`}
                    >
                      <input
                        type='radio'
                        name='servingUnit'
                        value={option.value}
                        checked={draftPreferences.servingUnit === option.value}
                        onChange={(event) => updatePreference('servingUnit', event.target.value)}
                        className='settings-choice-input'
                      />
                      <span>{option.label}</span>
                      <span className='settings-choice-meta'>{option.abbreviation}</span>
                    </label>
                  ))}
                </div>
                <p className='settings-help-text'>
                  Used by Nutrition Lookup and Meal Builder.
                </p>
              </fieldset>
            </section>

            <section className='settings-section' aria-labelledby='formatting-heading'>
              <div className='settings-section-header'>
                <div>
                  <h2 id='formatting-heading' className='settings-section-title'>Number formatting</h2>
                  <p className='settings-section-description'>
                    Control the precision used for displayed results.
                  </p>
                </div>
              </div>

              <fieldset className='settings-fieldset'>
                <legend className='settings-label'>Result precision</legend>
                <div className='settings-choice-list'>
                  {NUMBER_FORMAT_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={`settings-choice settings-format-choice ${
                        draftPreferences.numberFormat === option.value
                          ? 'settings-choice--selected'
                          : ''
                      }`}
                    >
                      <input
                        type='radio'
                        name='numberFormat'
                        value={option.value}
                        checked={draftPreferences.numberFormat === option.value}
                        onChange={(event) => updatePreference('numberFormat', event.target.value)}
                        className='settings-choice-input'
                      />
                      <span>
                        <span className='settings-choice-title'>{option.label}</span>
                        <span className='settings-choice-description'>{option.description}</span>
                      </span>
                      <span className='settings-number-preview'>
                        {option.value === 'whole' ? '1,235' : '1,234.6'}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </section>
          </div>

        </form>
      </div>
    </main>
  );
}

export default Settings;
