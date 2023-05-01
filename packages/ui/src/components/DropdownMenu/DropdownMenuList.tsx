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
