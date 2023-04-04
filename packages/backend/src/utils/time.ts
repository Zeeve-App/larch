/* eslint-disable import/prefer-default-export */

export const getTimestamp = ():string => new Date().toISOString().split('.')[0].split('T').join(' ');
