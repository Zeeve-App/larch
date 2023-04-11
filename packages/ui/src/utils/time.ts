/* eslint-disable import/prefer-default-export */

export const getFormattedLocalTime = (dateTimeInUTC: string): string => new Date(
  `${dateTimeInUTC.split(' ').join('T')}.000Z`,
).toLocaleString();
