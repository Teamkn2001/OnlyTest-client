import { Input } from "@/components/ui/input";
import { Check, ChevronDown} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
export interface Option {
  value: string;
  label: string;
}

interface AutoCompleteSelectProps {
  options: Option[];
  onSelect: (option: Option) => void;
  value?: Option | null; 
}

const AutoCompleteSelect = ({options , onSelect , value} : AutoCompleteSelectProps) => {
 
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [selectedOption, setSelectedOption] = useState<Option | null>(value ?? null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setFilteredOptions(
        options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      )
    );
    setIsDropdownOpen(true);
  };

  const handleOptionSelect = (option: Option) => {

    if (selectedOption?.value === option.value) {
      setSearchTerm("");
      setSelectedOption(null);
      setIsDropdownOpen(true);
      return;
    }
    
    setSelectedOption(option);
    setSearchTerm(option.label);
    setIsDropdownOpen(false);
    onSelect(option);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || filteredOptions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < filteredOptions.length) {
        handleOptionSelect(filteredOptions[highlightIndex]);
      }
    } else if (event.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    // setIsDropdownOpen((prev) => !prev);
    setIsDropdownOpen(!isDropdownOpen)
  };

  const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
  };

  useEffect(() => {
    if (isDropdownOpen && selectedOption) {
      const selectedIndex = filteredOptions.findIndex(
        (option) => option.value === selectedOption.value
      );
      if (selectedIndex !== -1 && optionRefs.current[selectedIndex]) {
        optionRefs.current[selectedIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [isDropdownOpen, selectedOption, filteredOptions]);

  useEffect(() => {
    
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  },[isDropdownOpen]);

  useEffect(() => {
    setSelectedOption(value ?? null);
    setSearchTerm(value?.label ?? "");
  }, [value]);
  
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);
  return (
    <div ref={containerRef} className="relative w-full max-w-sm">

      <div
        className="relative"
        onClick={() => !isDropdownOpen && toggleDropdown()}>
        <Input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="w-full roundb- border-2 border-orange-400 focus:outline-none pr-6"
        />
           <button
                type="button"
                onClick={toggleDropdown} 
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer focus:outline-none"
            >
                <ChevronDown
                    className={`h-4 w-4 transform transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                    }`}
                />
            </button>
           
      </div>
      
      {isDropdownOpen && (
        <ul ref={dropdownRef} className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-40 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={option.value}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                className={`flex justify-between cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                  highlightIndex === index
                    ? "bg-blue-100 font-semibold"
                    : selectedOption?.value === option.value
                    ? "bg-blue-50"
                    : ""
                }`}
                onMouseEnter={() => setHighlightIndex(index)}
                onClick={() => handleOptionSelect(option)}
              >
              {option.label}{" "}
              {selectedOption?.value === option.value && <Check />}
            </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteSelect;
