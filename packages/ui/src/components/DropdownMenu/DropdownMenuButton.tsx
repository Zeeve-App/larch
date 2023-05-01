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
