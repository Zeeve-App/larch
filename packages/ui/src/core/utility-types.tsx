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

type RequiredNotNull<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

type RequiredProperties<T, P extends keyof T> = T & Required<RequiredNotNull<Pick<T, P>>>;
type OptionalProperties<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type RemoveProperties<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export { type RequiredProperties, type OptionalProperties, type RemoveProperties };
