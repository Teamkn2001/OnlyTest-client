import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface TextChoice {
  id: string | number;
  text: string;
}

interface TextOnlyChoicesProps {
  choices: TextChoice[];
  onSelectionChange?: (selectedChoices: (string | number)[]) => void;
  allowMultiple?: boolean;
  maxSelections?: number;
  title?: string;
}

export default function MultipleTextChoices({
  choices,
  onSelectionChange,
  allowMultiple = false,
  maxSelections,
  title
}: TextOnlyChoicesProps) {
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

  return (
    <div className="w-full max-w-4xl bg-white">
      <div className="px-10 ">
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

        {/* Choices List */}
        <div className="space-y-6  ">
          {choices.map((choice) => {
            const selected = isSelected(choice.id);
            const disabled = isDisabled(choice.id);
            return (
              <div
                key={choice.id}
                onClick={() => !disabled && handleChoiceSelect(choice.id)}
                className={`
                  relative cursor-pointer transition-all duration-200 flex items-center gap-4
                  ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {/* Selection Indicator - Checkbox */}
                <div className="mr-4 ">
                  <div className={`w-8 h-8 rounded-full border-2 flex  items-center justify-center transition-all duration-200 ${
                    selected 
                      ? 'bg-orange-500 border-orange-500 ' 
                      : 'bg-[#F2F1F0] border-gray-300 hover:border-gray-400  shadow-[0_-2px_4px_rgba(0,0,0,0.3)]'
                  }`}>
                    {selected && (
                      <Check className="w-6 h-6 text-black" />
                    )}
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <p className={`font-medium text-sm ${selected ? 'text-gray-900' : 'text-gray-700'}`}>
                    {choice.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}