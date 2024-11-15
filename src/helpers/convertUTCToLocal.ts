export const convertUTCToLocal = (value: Date | string): string => {
  if (!value) return '';

  try {
    const utcDate = value instanceof Date ? value : new Date(value);

    if (isNaN(utcDate.getTime())) return '';

    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);

    const month = localDate.toLocaleString('en-US', { month: 'long' });
    const year = localDate.getFullYear();
    const day = localDate.getDate().toString().padStart(2, '0');
    const hours = localDate.getHours();
    const minutes = localDate.getMinutes().toString().padStart(2, '0');

    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = (hours % 12 || 12).toString().padStart(2, '0');

    return `${month}/${day}/${year}, ${hour12}:${minutes} ${period}`;
  } catch (error) {
    return '';
  }
};

export const convertUTCToLocalDate = (value: Date | string): string => {
  if (!value) return '';

  try {
    const utcDate = value instanceof Date ? value : new Date(value);

    if (isNaN(utcDate.getTime())) return '';

    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);

    const month = localDate.toLocaleString('en-US', { month: 'long' });
    const year = localDate.getFullYear();
    const day = localDate.getDate().toString().padStart(2, '0');

    return `${month}/${day}/${year}`;
  } catch (error) {
    return '';
  }
};

export const convertUTCToLocalTime = (value: Date | string): string => {
  if (!value) return '';

  try {
    const utcDate = value instanceof Date ? value : new Date(value);

    if (isNaN(utcDate.getTime())) return '';

    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);

    const hours = localDate.getHours();
    const minutes = localDate.getMinutes().toString().padStart(2, '0');

    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = (hours % 12 || 12).toString().padStart(2, '0');

    return `${hour12}:${minutes} ${period}`;
  } catch (error) {
    return '';
  }
};
