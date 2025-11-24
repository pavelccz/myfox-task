/**
 * Formats a date-time string (e.g. AWSDateTime / ISO) into `d.m.yyyy h:mm`.
 * Returns an empty string for falsy or invalid input.
 *
 * @param value - Date-time string that can be passed to the Date constructor.
 * @returns Formatted date-time or an empty string if input is missing or invalid.
 */
export const formatDateTime = (value?: string | null): string => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

/**
 * Formats a date-time string (e.g. AWSDateTime / ISO) into `d.m.yyyy` (without time).
 * Returns an empty string for falsy or invalid input.
 *
 * @param value - Date-time string that can be passed to the Date constructor.
 * @returns Formatted date or an empty string if input is missing or invalid.
 */
export const formatDate = (value?: string | null): string => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

/**
 * Formats a number as Czech currency without decimal places, e.g. `1690` → `1 690 Kč`.
 * Returns an empty string when value is null or undefined.
 *
 * @param value - Price value in CZK.
 * @returns Formatted price with currency suffix or an empty string.
 */
export const formatPriceCZK = (value?: number | null): string => {
  if (value == null) return '';
  return (
    value.toLocaleString('cs-CZ', {
      maximumFractionDigits: 0,
    }) + ' Kč'
  );
};
