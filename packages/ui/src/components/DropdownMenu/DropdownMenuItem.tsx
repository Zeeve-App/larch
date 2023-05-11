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
import { twMerge } from "tailwind-merge";
import { Button, ButtonProps } from "src/components/Button";
import { RemoveProperties } from "src/core";

interface DropdownMenuItemProps extends RemoveProperties<ButtonProps, "loading"> { }

const DropdownMenuItem = forwardRef<HTMLButtonElement, DropdownMenuItemProps>((props, ref) => {
    const { children, className, ...rest } = props;

    return (
        <Button
            className={twMerge(
                "flex w-full cursor-pointer items-center justify-start gap-3 rounded-none bg-transparent py-2 px-4 font-medium text-brand-dark hover:bg-brand-blue hover:text-white",
                className,
            )}
            role='menuitem'
            ref={ref}
            {...rest}
        >
            {children}
        </Button>
    );
});

export { type DropdownMenuItemProps, DropdownMenuItem };
