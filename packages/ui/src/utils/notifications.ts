/* eslint-disable import/prefer-default-export */
import { toast } from "react-toastify";
import { ReactComponent as IconSuccess } from "src/assets/NotificationSuccess.svg";
import { ReactComponent as IconError } from "src/assets/NotificationError.svg";
import { ReactComponent as IconInfo } from "src/assets/NotificationInfo.svg";

type ToastType = "success" | "error" | "info";

type ToastIcon = {
  [key in ToastType]: any;
};

const ToastTypeIcons: ToastIcon = {
  success: IconSuccess,
  info: IconInfo,
  error: IconError,
};

export const notify = (type: ToastType, message: string) => {
  toast[type](message, {
    icon: ToastTypeIcons[type],
  });
};
