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
import {
    AnimatePresence,
    HTMLMotionProps,
    motion,
    Variants,
} from "framer-motion";
import { twMerge } from "tailwind-merge";
import { RequiredProperties } from "src/core";

const motionVariants: Variants = {
    hidden: {
        y: -10,
        opacity: 0,
        clipPath: "inset(10px 0% 99% 0% round 10px)",
    },
    visible: {
        y: 0,
        opacity: 1,
        clipPath: "inset(0 round 10px)",
    },
};

const styles = cva(
    "border border-brand-outline absolute min-w-[148px] w-max mt-2 rounded-lg bg-white shadow-xl py-2",
    {
        variants: {
            direction: {
                left: "left-0",
                right: "right-0",
            },
        },
    }
);

type DropdownMenuListVariantProps = VariantProps<typeof styles>;

interface DropdownMenuListProps
    extends HTMLMotionProps<"div">,
    RequiredProperties<DropdownMenuListVariantProps, "direction"> {
    isOpen: boolean;
}

const DropdownMenuList = forwardRef<HTMLDivElement, DropdownMenuListProps>(
    (props, ref) => {
        const { isOpen, direction, className, children, ...rest } = props;

        return (
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        variants={motionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={twMerge(styles({ direction, className }))}
                        role="menu"
                        aria-orientation="vertical"
                        ref={ref}
                        {...rest}
                    >
                        {children}
                    </motion.div>
                ) : null}
            </AnimatePresence>
        );
    }
);

export { type DropdownMenuListProps, DropdownMenuList };
