import React, { forwardRef } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface DropdownMenuGroupTitleProps extends HTMLMotionProps<"p"> {
    title: string;
}

const DropdownMenuGroupTitle = forwardRef<HTMLParagraphElement, DropdownMenuGroupTitleProps>((props, ref) => {
    const { title, className, ...rest } = props;

    return (
        <motion.p
            className={twMerge("py-2 px-3 text-sm font-bold text-dark-600", className)}
            title={title}
            ref={ref}
            {...rest}
        >
            {title}
        </motion.p>
    );
});

export { type DropdownMenuGroupTitleProps, DropdownMenuGroupTitle };
