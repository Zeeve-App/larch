import React from 'react';
import { PolymorphicComponentPropWithRef, PolymorphicRef } from '@/core';

type LinkComponentProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<
  C,
  {
    href?: string;
  }
  >;

type LinkProps = <C extends React.ElementType = 'a'>(
  props: LinkComponentProps<C>
) => React.ReactElement | null;

const Link: LinkProps = React.forwardRef(
  <C extends React.ElementType = 'a'>(
    {
      as, href, children, ...rest
    }: LinkComponentProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'a';

    return (
      <Component href={href} ref={ref} {...rest}>
        {children}
      </Component>
    );
  },
);

export { type LinkComponentProps, type LinkProps, Link };
