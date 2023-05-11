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

import { MutableRefObject, forwardRef, useRef } from "react";
import { Button } from "src/components/Button";
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuItem,
  DropdownMenuList,
  DropdownMenuProps,
} from "src/components/DropdownMenu";

import { ReactComponent as IconArrowDown } from "src/assets/ArrowDown.svg";
import { FilterItem } from "./type";
import { useToggle, useOnClickOutside } from "src/hooks";

export interface FilterDropdownProps extends DropdownMenuProps {
  options: FilterItem[];
  setOptions: React.Dispatch<React.SetStateAction<FilterItem[]>>;
}

const FilterDropdown = forwardRef<HTMLDivElement, FilterDropdownProps>(
  (props, ref) => {
    const { options, setOptions, ...rest } = props;

    const { isOpen, handleToggle, handleClose } = useToggle();

    const localRef = useRef(null);
    const dropdownRef = ref || localRef;
    useOnClickOutside(dropdownRef as MutableRefObject<HTMLDivElement>, handleClose);

    const handleCheck = (currentItem: FilterItem) => {
      setOptions(() => {
        return options.map((item) => {
          if (item.key === currentItem.key) {
            if (!currentItem.checked) handleClose();

            return {
              ...item,
              checked: !item.checked,
              isOpen: !item.checked,
              value: ""
            };
          } else return {
            ...item,
            isOpen: false
          };
        });
      });
    };

    return (
      <DropdownMenu className="relative text-white" ref={dropdownRef} {...rest}>
        <DropdownMenuButton
          as={Button}
          className="bg-larch-dark_2 border-2 border-dark-700"
          iconRight={<IconArrowDown className="w-7 h-7" />}
          onClick={handleToggle}
        >
          Filter By
        </DropdownMenuButton>
        <DropdownMenuList
          className="bg-larch-dark_3 text-white z-dropdown"
          direction="left"
          isOpen={isOpen}
        >
          {options.map((option, index) => {
            return (
              <DropdownMenuItem
                className="text-white hover:bg-larch-dark_2"
                key={index}
                onClick={() => handleCheck(option)}
              >
                <label className="cursor-pointer flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="bg-larch-dark_2 border-dark-700 border-2 checked:border-dark-700 checked:bg-transparent focus:checked:bg-transparent hover:checked:bg-transparent rounded w-5 h-5"
                    checked={option.checked}
                    onChange={() => handleCheck(option)}
                  />
                  {option.label}
                </label>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuList>
      </DropdownMenu>
    );
  }
);

export default FilterDropdown;
