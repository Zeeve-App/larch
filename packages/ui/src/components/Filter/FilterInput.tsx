import {
  HTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";
import FocusLock from "react-focus-lock";
import { FilterItem } from "./type";
import { ReactComponent as IconCheck } from "src/assets/Check.svg";

export interface FilterInputProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  item: FilterItem;
  handler: (value: string) => void;
  close: () => void;
}

const FilterInput = forwardRef<HTMLInputElement, FilterInputProps>(
  (props, ref) => {
    const { className, close, item, handler, ...rest } = props;

    return (
      <FocusLock className="absolute -left-1 -bottom-2 z-[499]">
        {item.type === "searchable" && (
          <label className="">
            <input
              type="text"
              className={twMerge(
                "absolute bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md pe-12 max-w-[18rem]",
                className
              )}
              value={item.value}
              onChange={(e) => {
                handler(e.target.value);
              }}
              ref={ref}
              {...rest}
            />
            <IconCheck
              className="absolute w-6 h-6 -right-[16rem] -bottom-8 cursor-pointer"
              onClick={(e) => {
                close();
              }}
            />
          </label>
        )}
        {item.type === "date" && (
          <label className="">
            <input
              type="datetime-local"
              className={twMerge(
                "absolute left-1 -bottom-11 flex bg-larch-dark_2 focus:bg-larch-dark  text-white focus:ring-larch-dark border-dark-700 border-2 rounded-md max-w-[18rem]",
                className
              )}
              value={item.value ? item.value : new Date().toISOString().split('T').join(' ').split(".")[0]}
              onChange={(e) => {
                handler(e.target.value);
              }}
              ref={ref}
              {...rest}
            />
            <IconCheck
              className="absolute w-6 h-6 -right-[17rem] text-white -bottom-9 cursor-pointer"
              onClick={(e) => {
                close();
              }}
            />
          </label>
        )}
      </FocusLock>
    );
  }
);

export { FilterInput };
