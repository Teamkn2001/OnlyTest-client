import { useState } from 'react';
import { Check } from 'lucide-react';

interface TextChoice {
  id: string | number;
  text: string;
}

interface SimpleTextChoicesProps {
  choices: TextChoice[];
  onSelectionChange?: (selectedChoice: string | number | null) => void;
  title?: string;
}

//   Demo usage
//   const [selectedChoice, setSelectedChoice] = useState<string | number | null>(null);
//   const sampleChoices = [
//     { id: 1, text: "Option A - This is the first choice" },
//     { id: 2, text: "Option B - This is the second choice" },
//     { id: 3, text: "Option C - This is the third choice" },
//     { id: 4, text: "Option D - This is the fourth choice" }
//   ];

//       <SimpleTextChoices
//         choices={sampleChoices}
//         title="Choose Your Preferred Option"
//         onSelectionChange={setSelectedChoice}
//       />
      

export default function MultipleTextChoices({
  choices,
  onSelectionChange,
  title
}: SimpleTextChoicesProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | number | null>(null);

  const handleChoiceSelect = (choiceId: string | number): void => {
    // Toggle selection - if already selected, deselect it
    const newSelection = selectedChoice === choiceId ? null : choiceId;
    setSelectedChoice(newSelection);
    onSelectionChange?.(newSelection);
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
      <div className="px-10">
        {/* Title */}
        {title && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">Select one option</p>
          </div>
        )}

        {/* Choices List */}
        <div className="space-y-6">
          {choices.map((choice) => {
            const selected = selectedChoice === choice.id;
            return (
              <div
                key={choice.id}
                onClick={() => handleChoiceSelect(choice.id)}
                className="relative cursor-pointer transition-all duration-200 flex items-center gap-4"
              >
                {/* Selection Indicator */}
                <div className="mr-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    selected 
                      ? 'bg-orange-500 border-orange-500' 
                      : 'bg-[#F2F1F0] border-gray-300 hover:border-gray-400 shadow-[0_-2px_4px_rgba(0,0,0,0.3)]'
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

