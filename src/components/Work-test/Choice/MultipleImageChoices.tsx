import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface Choice {
  id: string | number;
  text?: string;
  image?: string;
}

interface MultipleChoicesProps {
  choices: Choice[];
  onSelectionChange?: (selectedChoices: (string | number)[]) => void;
  allowMultiple?: boolean;
  maxSelections?: number;
  title?: string;
  columns?: number;
}

export default function MultipleImageChoices({
  choices,
  onSelectionChange,
  allowMultiple = false,
  maxSelections,
  title,
  columns = 2
}: MultipleChoicesProps) {
  const [selectedChoices, setSelectedChoices] = useState<(string | number)[]>([]);

  const handleChoiceSelect = (choiceId: string | number): void => {
    let newSelection: (string | number)[];

    if (allowMultiple) {
      if (selectedChoices.includes(choiceId)) {
        // Remove if already selected
        newSelection = selectedChoices.filter(id => id !== choiceId);
      } else {
        // Add if not selected (check max limit)
        if (maxSelections && selectedChoices.length >= maxSelections) {
          return; // Don't allow more selections
        }
        newSelection = [...selectedChoices, choiceId];
      }
    } else {
      // Single selection mode
      newSelection = selectedChoices.includes(choiceId) ? [] : [choiceId];
    }

    setSelectedChoices(newSelection);
    onSelectionChange?.(newSelection);
  };

  const isSelected = (choiceId: string | number): boolean => {
    return selectedChoices.includes(choiceId);
  };

  const isDisabled = (choiceId: string | number): boolean => {
    return allowMultiple && 
           maxSelections !== undefined && 
           selectedChoices.length >= maxSelections && 
           !selectedChoices.includes(choiceId);
  };

  // Calculate grid columns based on number of choices and columns prop
  const getGridCols = (): string => {
    const actualColumns = Math.min(columns, choices.length);
    const colsMap: { [key: number]: string } = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6'
    };
    return colsMap[actualColumns] || 'grid-cols-2';
  };

  if (!choices || choices.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white">
        <div className="py-6">
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500 text-lg">No choices available</p>
          </div>
        </div>
      </div>
    );
  }

  console.log("selectedChoices:", selectedChoices);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white">
      <div className="py-6">
        {/* Title */}
        {title && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {allowMultiple 
                ? `Select ${maxSelections ? `up to ${maxSelections}` : 'multiple'} option${maxSelections !== 1 ? 's' : ''}`
                : 'Select one option'
              }
            </p>
          </div>
        )}

        {/* Choices Grid */}
        <div className={`grid ${getGridCols()} gap-4`}>
          {choices.map((choice) => {
            const selected = isSelected(choice.id);
            const disabled = isDisabled(choice.id);

            return (
              <div
                key={choice.id}
                onClick={() => !disabled && handleChoiceSelect(choice.id)}
                className={`
                  relative cursor-pointer transition-all duration-200 
                  ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {/* Selection Indicator - Top Left Circle */}
                <div className="absolute top-2 left-2 z-10">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    selected 
                      ? 'bg-orange-500 border-orange-500' 
                      : 'bg-[#F2F1F0] border-gray-300 hover:border-gray-400  shadow-[0_-2px_4px_rgba(0,0,0,0.3)]'
                  }`}>
                    {selected && (
                      <Check className="w-4 h-4 text-black " />
                    )}
                  </div>
                </div>

                {/* Content Container */}
                <div className={`
                  p-6  bg-white transition-all duration-200
                 
                `}>
                  {/* Image Content */}
                  {choice.image && (
                    <div className="mb-4 flex justify-center">
                      <img
                        src={choice.image}
                        alt={choice.text || `Choice ${choice.id}`}
                        className="w-48 h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Text Content - Only show if no image is present */}
                  {choice.text && !choice.image && (
                    <div className="text-left px-12">
                      <p className={`font-medium text-sm ${selected ? 'text-gray-900' : 'text-gray-700'}`}>
                        {choice.text}
                      </p>
                    </div>
                  )}

                  {/* Choice ID fallback if no text or image */}
                  {!choice.text && !choice.image && (
                    <div className="text-center">
                      <p className={`font-medium text-sm ${selected ? 'text-gray-900' : 'text-gray-700'}`}>
                        Option {choice.id}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}