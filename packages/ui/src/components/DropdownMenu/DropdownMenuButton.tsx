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

import React from "react";
import { Button } from "../Button";
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "src/core";

type DropdownMenuButtonComponentProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<C>;

type DropdownMenuButtonProps = <C extends React.ElementType = "button">(
    props: DropdownMenuButtonComponentProps<C>,
) => React.ReactElement | null;

const DropdownMenuButton: DropdownMenuButtonProps = React.forwardRef(
    <C extends React.ElementType = "button">(
        { as, children, ...rest }: DropdownMenuButtonComponentProps<C>,
        ref?: PolymorphicRef<C>,
    ) => {
        const Component = as || Button;

        return (
            <Component className="relative" ref={ref} {...rest} type="button" aria-haspopup="true">
                {children}
            </Component>
        );
    },
);

export { type DropdownMenuButtonComponentProps, type DropdownMenuButtonProps, DropdownMenuButton };
