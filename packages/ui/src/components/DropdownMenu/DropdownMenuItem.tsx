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
