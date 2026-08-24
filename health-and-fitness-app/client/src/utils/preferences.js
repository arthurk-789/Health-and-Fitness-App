export const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'sunset', label: 'Sunset' },
  { value: 'violet', label: 'Violet' },
];

export const SERVING_UNIT_OPTIONS = [
  { value: 'g', label: 'Grams', abbreviation: 'g' },
  { value: 'oz', label: 'Ounces', abbreviation: 'oz' },
  { value: 'lbs', label: 'Pounds', abbreviation: 'lbs' },
];

export const NUMBER_FORMAT_OPTIONS = [
  {
    value: 'whole',
    label: 'Whole numbers',
    description: 'Round displayed results to the nearest whole number.',
  },
  {
    value: 'decimal',
    label: 'Decimals',
    description: 'Show displayed results with one decimal place.',
  },
];

const PREFERENCES_STORAGE_KEY = 'fitness-health-preferences';

export const DEFAULT_PREFERENCES = {
  theme: 'dark',
  servingUnit: 'g',
  reduceMotion: false,
  weight: '',
  numberFormat: 'whole',
};

export function loadPreferences() {
  let storedPreferences = {};

  try {
    storedPreferences = JSON.parse(localStorage.getItem(PREFERENCES_STORAGE_KEY)) || {};
  } catch {
    storedPreferences = {};
  }

  const legacyTheme = localStorage.getItem('theme');
  const theme = THEME_OPTIONS.some((option) => option.value === storedPreferences.theme)
    ? storedPreferences.theme
    : THEME_OPTIONS.some((option) => option.value === legacyTheme)
      ? legacyTheme
      : DEFAULT_PREFERENCES.theme;

  return {
    theme,
    servingUnit: SERVING_UNIT_OPTIONS.some(
      (option) => option.value === storedPreferences.servingUnit
    )
      ? storedPreferences.servingUnit
      : DEFAULT_PREFERENCES.servingUnit,
    reduceMotion: storedPreferences.reduceMotion === true,
    weight:
      storedPreferences.weight === undefined || storedPreferences.weight === null
        ? DEFAULT_PREFERENCES.weight
        : String(storedPreferences.weight),
    numberFormat: NUMBER_FORMAT_OPTIONS.some(
      (option) => option.value === storedPreferences.numberFormat
    )
      ? storedPreferences.numberFormat
      : DEFAULT_PREFERENCES.numberFormat,
  };
}

export function savePreferences(preferences) {
  localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
  localStorage.setItem('theme', preferences.theme);
}

export function formatNumber(value, numberFormat) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return value;
  }

  const fractionDigits = numberFormat === 'decimal' ? 1 : 0;

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(numericValue);
}
