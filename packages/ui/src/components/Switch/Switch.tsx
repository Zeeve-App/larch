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

import { forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { HTMLMotionProps, motion, Variants } from "framer-motion";
import { RemoveProperties } from "src/core";
import { SwitchContainer, SwitchContainerProps } from "./SwitchContainer";

const style = cva(
  "rounded-full checked:bg-none text-white focus:border-none active:border-none border-none checked:border-0 focus:ring-0 focus:ring-offset-0 cursor-pointer",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-70 hover:shadow-none focus:shadow-none",
      },
      checked: {
        true: "shadow-2xl shadow-slate-500",
        false: "",
      },
      size: {
        small: "w-3 h-3",
        medium: "w-4 h-4",
        large: "w-5 h-5",
      },
    },
  },
);

const variants: Variants = {
  checked: (checked: boolean) => {
    if (checked)
      return {
        translateX: "100%",
      };
    else
      return {
        translateX: "-100%",
      };
  },
};

interface SwitchProps
  extends RemoveProperties<HTMLMotionProps<"input">, "type" | "disabled" | "checked" | "size">,
  RemoveProperties<VariantProps<typeof style>, "checked"> {
  checked: boolean;
  containerProps?: SwitchContainerProps;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const { className, size, checked, disabled, containerProps, id, ...rest } = props;

  return (
    <SwitchContainer checked={checked} disabled={disabled} size={size} htmlFor={id} {...containerProps}>
      <motion.input
        className={twMerge(style({ className, disabled, checked, size }))}
        variants={variants}
        animate="checked"
        custom={checked}
        id={id}
        checked={checked ? true : false}
        disabled={disabled ? true : false}
        type="checkbox"
        ref={ref}
        {...rest}
      ></motion.input>
    </SwitchContainer>
  );
});

Switch.defaultProps = {
  checked: false,
  size: "small",
};

export { Switch, type SwitchProps };
