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

import {
  DetailedHTMLProps,
  HTMLAttributes,
  forwardRef,
  useEffect,
} from "react";
import { FilterItem } from "./type";
import FilterDropdown from ".//FilterDropdown";

export interface FilterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  filters: FilterItem[];
  setFilters: React.Dispatch<React.SetStateAction<FilterItem[]>>;
}

const Filter = forwardRef<HTMLDivElement, FilterProps>((props, ref) => {
  const { filters, setFilters, ...rest } = props;

  return (
    <div className="flex flex-row justify-end text-white" ref={ref} {...rest}>
      <FilterDropdown options={filters} setOptions={setFilters} />
    </div>
  );
});

export { Filter };
