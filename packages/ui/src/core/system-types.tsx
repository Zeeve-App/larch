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
