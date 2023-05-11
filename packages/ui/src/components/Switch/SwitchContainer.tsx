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

import React, { forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { HTMLMotionProps, motion } from "framer-motion";

const style = cva("grid place-items-center bg-slate-500 content-none rounded-full cursor-pointer", {
    variants: {
        disabled: {
            true: "cursor-not-allowed opacity-70 hover:shadow-none focus:shadow-none",
        },
        checked: {
            true: "bg-teal-600",
        },
        size: {
            small: "h-6 w-12",
            medium: "h-8 w-16",
            large: "h-10 w-20",
        },
    },
});

interface SwitchContainerProps extends HTMLMotionProps<"label">, VariantProps<typeof style> {}

const SwitchContainer = forwardRef<HTMLLabelElement, SwitchContainerProps>((props, ref) => {
    const { className, disabled, size, checked, children, ...rest } = props;

    return (
        <motion.label
            className={twMerge(
                style({
                    disabled,
                    checked,
                    size,
                    className,
                }),
            )}
            ref={ref}
            {...rest}
        >
            {children}
        </motion.label>
    );
});

export { SwitchContainer, type SwitchContainerProps };
