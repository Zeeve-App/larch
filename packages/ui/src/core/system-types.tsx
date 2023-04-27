type As<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (As<C> & P);

type PolymorphicComponentProp<C extends React.ElementType, Props = unknown> = React.PropsWithChildren<Props & As<C>> &
Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicComponentPropWithRef<C extends React.ElementType, Props = unknown> = PolymorphicComponentProp<
C,
Props
> & {
  ref?: PolymorphicRef<C>;
};

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

export {
  type As,
  type PropsToOmit,
  type PolymorphicComponentProp,
  type PolymorphicComponentPropWithRef,
  type PolymorphicRef,
};
