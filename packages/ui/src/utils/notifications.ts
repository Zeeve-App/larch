/* eslint-disable import/prefer-default-export */
import { toast } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info';

export const notify = (type: ToastType, message: string) => {
  toast[type](message);
};
