import React from 'react';
import { twMerge } from 'tailwind-merge';
import { PolymorphicComponentPropWithRef, PolymorphicRef } from 'src/core';

type SidebarItemComponentProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<
  C,
  {
    title: string;
    active: boolean;
    iconLeft?: React.ReactElement;
    badge?: React.ReactElement;
    isChild?: boolean;
  }
  >;

type SidebarItemProps = <C extends React.ElementType = 'a'>(
  props: SidebarItemComponentProps<C>
) => React.ReactElement | null;

const SidebarItem: SidebarItemProps = React.forwardRef(
  <C extends React.ElementType = 'a'>(
    {
      as,
      title,
      active,
      iconLeft,
      badge,
      isChild,
      className,
      ...rest
    }: SidebarItemComponentProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'a';

    return (
      <Component
        className={twMerge(
          'group relative flex max-h-14 cursor-pointer items-center justify-start gap-3 py-4 px-6 text-white transition-all duration-200 ease-in-out',
          isChild && 'px-10',
          active && 'bg-brand-gradient',
          className,
        )}
        ref={ref}
        {...rest}
      >
        <div
          className={`absolute left-0 rounded-r-full border-l-4 border-white py-4 group-hover:block ${
            active ? 'block' : 'hidden'
          }`}
        />
        {iconLeft && iconLeft}
        <span className='flex flex-col gap-y-1 text-base font-normal leading-4'>
          {title}
          {badge && badge}
        </span>
      </Component>
    );
  },
);

export { type SidebarItemComponentProps, type SidebarItemProps, SidebarItem };
