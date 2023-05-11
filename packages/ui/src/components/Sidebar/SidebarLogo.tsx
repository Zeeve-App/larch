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
import { twMerge } from "tailwind-merge";
import { HTMLMotionProps, motion } from "framer-motion";
import { RemoveProperties } from "src/core";

interface SidebarLogoProps
  extends RemoveProperties<HTMLMotionProps<"img">, "src"> {
  src: string;
  href: string;
  anchorHTMLProps?: RemoveProperties<HTMLMotionProps<"a">, "href">;
}

const SidebarLogo = forwardRef<HTMLImageElement, SidebarLogoProps>(
  (props, ref) => {
    const { className, src, href, anchorHTMLProps, ...rest } = props;

    return (
      <motion.a
        {...anchorHTMLProps}
        className={twMerge(
          "sticky top-0 z-[2] flex h-20 flex-col w-full items-center justify-center border-b border-dark-700 bg-larch-dark md:w-72",
          anchorHTMLProps?.className
        )}
        href={href}
      >
        <motion.img
          src={src}
          alt="Logo"
          className={twMerge("w-32", className)}
          ref={ref}
          {...rest}
        />
      </motion.a>
    );
  }
);

export { type SidebarLogoProps, SidebarLogo };
