/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

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
