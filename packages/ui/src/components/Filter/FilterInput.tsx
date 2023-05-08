import { HTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
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
      <FocusLock className="absolute left-0 -bottom-[55px] z-[499]">
        {item.type === "searchable" && (
          <label className="relative w-full">
            <input
              type="text"
              className={twMerge(
                "bg-larch-dark_2 focus:bg-larch-dark focus:ring-larch-dark border-dark-700 border-2 rounded-md pe-12 max-w-[18rem]",
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
              className="absolute w-6 h-6 -top-1 right-3 cursor-pointer"
              onClick={(e) => {
                close();
              }}
            />
          </label>
        )}
        {item.type === "date" && (
          <label className="relative w-full">
            <input
              type="datetime-local"
              className={twMerge(
                "relative flex bg-larch-dark_2 focus:bg-larch-dark  text-white focus:ring-larch-dark border-dark-700 border-2 rounded-md max-w-[18rem]",
                className
              )}
              value={
                item.value
                  ? item.value
                  : new Date().toISOString().split("T").join(" ").split(".")[0]
              }
              onChange={(e) => {
                handler(e.target.value);
              }}
              ref={ref}
              {...rest}
            />
            <IconCheck
              className="absolute w-6 h-6 top-[50%] -translate-y-1/2 right-3 text-white cursor-pointer"
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
