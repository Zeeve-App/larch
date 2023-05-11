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

import React from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderLogoProps {
  logoImgSrc: string;
  logoHref: string;
  className?: string;
  logoImgClassName?: string;
}

const HeaderLogo: React.FC<HeaderLogoProps> = (props) => {
  const {
    logoImgSrc, logoHref, className, logoImgClassName,
  } = props;

  return (
    <a
      className={twMerge('flex flex-row items-center gap-x-2', className)}
      href={logoHref}
    >
      <img
        src={logoImgSrc}
        alt='Larch Logo'
        className={twMerge('', logoImgClassName)}
      />
    </a>
  );
};

export { type HeaderLogoProps, HeaderLogo };
