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
