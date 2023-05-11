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

import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderLogoContainerProps
  extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
  > {}

const HeaderLogoContainer = forwardRef<
HTMLDivElement,
HeaderLogoContainerProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div
      className={twMerge(
        'flex md:hidden h-full items-center justify-start gap-x-2 px-2 md:w-72 lg:gap-x-4 lg:px-8',
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

export { type HeaderLogoContainerProps, HeaderLogoContainer };
