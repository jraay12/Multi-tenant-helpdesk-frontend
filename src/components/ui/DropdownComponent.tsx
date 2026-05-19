import { ChevronDown } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type SelectDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  data: Option[];
  placeholder?: string;
};

const SelectDropdown = ({
  value,
  onChange,
  data,
  placeholder = "Select option",
}: SelectDropdownProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-8 appearance-none border border-gray-300 rounded-md px-3 pr-8 bg-white outline-none cursor-pointer"
        >
          <option value="">{placeholder}</option>

          {data.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
      </div>
    </div>
  );
};

export default SelectDropdown;