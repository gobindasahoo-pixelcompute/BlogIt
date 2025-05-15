import React, { useEffect, useState } from "react";

import { Down } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import classNames from "classnames";

const DropDown = ({
  defaultValue = "",
  onChange,
  handleSubmit,
  isChanged = true,
  options,
  className,
}) => {
  const [selectedLabel, setSelectedLabel] = useState(
    options.find(opt => opt.value === defaultValue)?.label
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    setSelectedLabel(options.find(opt => opt.value === defaultValue)?.label);
  }, [defaultValue]);

  const handleSelect = value => {
    setSelectedLabel(options.find(opt => opt.value === value)?.label);
    if (onChange) onChange(value);
    setIsDropdownOpen(false);
    if (options.find(opt => opt.value === value)?.label !== selectedLabel) {
      isChanged && setDisable(!isChanged);
    }
  };

  useEffect(() => {
    setDisable(!isChanged);
  }, [isChanged]);

  return (
    <div
      className={`relative inline-flex h-7 rounded bg-black text-white transition hover:bg-black/90 ${className}`}
    >
      <Button
        disabled={disable}
        label={selectedLabel}
        style="tertiary"
        className={classNames("px-4", {
          "cursor-not-allowed opacity-50": disable,
        })}
        onClick={handleSubmit}
      />
      <Button
        className="border-4 border-red-400 px-2"
        icon={Down}
        style="tertiary"
        onClick={() => setIsDropdownOpen(prev => !prev)}
      />
      {isDropdownOpen && (
        <ul className="absolute right-0 top-full z-10 mt-1 w-40 rounded border border-gray-300 bg-white text-black shadow-lg">
          {options.map(option => (
            <li
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              key={option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
