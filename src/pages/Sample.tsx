import { useState } from 'react';

import AutoCompleteSelect from '@/components/ui@system/AutoComplete';

// AutoCompleteSelect component (from your code)
export interface Option {
  value: string;
  label: string;
}


// Usage Example Component
export default function UsageExample () {
  // Sample data
  const countries: Option[] = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "au", label: "Australia" },
    { value: "br", label: "Brazil" },
    { value: "in", label: "India" },
    { value: "mx", label: "Mexico" }
  ];

  const fruits: Option[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "strawberry", label: "Strawberry" },
    { value: "pineapple", label: "Pineapple" }
  ];

  // State for controlled components
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);
  const [selectedFruit, setSelectedFruit] = useState<Option | null>({ value: "apple", label: "Apple" });
  const [lastSelection, setLastSelection] = useState<string>("");

  const handleCountrySelect = (option: Option) => {
    console.log(`Selected country: ${option.label}`);
    setSelectedCountry(option);
    setLastSelection(`Selected country: ${option.label}`);
  };

  const handleFruitSelect = (option: Option) => {
    console.log(`Selected fruit: ${option.label}`);
    setSelectedFruit(option);
    setLastSelection(`Selected fruit: ${option.label}`);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">AutoCompleteSelect Usage Examples</h1>
      
      {/* Basic Usage */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">1. Basic Usage (Uncontrolled)</h2>
        <p className="text-gray-600">Select a country:</p>
        <AutoCompleteSelect
          options={countries}
          onSelect={handleCountrySelect}
        />
      </div>

      {/* Controlled Component with Pre-selected Value */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">2. Controlled Component with Pre-selected Value</h2>
        <p className="text-gray-600">Select a fruit (Apple is pre-selected):</p>
        <AutoCompleteSelect
          options={fruits}
          onSelect={handleFruitSelect}
          value={selectedFruit}
        />
        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedFruit({ value: "banana", label: "Banana" })}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Set to Banana
          </button>
          <button 
            onClick={() => setSelectedFruit(null)}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
          >
            Clear Selection
          </button>
        </div>
      </div>

      {/* Selection Display */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">3. Current Selections</h2>
        <div className="bg-gray-100 p-4 rounded-lg space-y-2">
          <p><strong>Country:</strong> {selectedCountry ? selectedCountry.label : "None selected"}</p>
          <p><strong>Fruit:</strong> {selectedFruit ? selectedFruit.label : "None selected"}</p>
          <p><strong>Last Action:</strong> {lastSelection || "No selections yet"}</p>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">4. Features & Usage</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>Search:</strong> Type to filter options</li>
            <li>• <strong>Keyboard Navigation:</strong> Use arrow keys to navigate, Enter to select, Escape to close</li>
            <li>• <strong>Click Outside:</strong> Closes the dropdown</li>
            <li>• <strong>Toggle Selection:</strong> Click selected item again to deselect</li>
            <li>• <strong>Chevron Icon:</strong> Click to toggle dropdown</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

