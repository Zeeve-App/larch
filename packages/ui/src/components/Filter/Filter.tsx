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
