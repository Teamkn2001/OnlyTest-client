import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TextChoice {
  id: string | number;
  text: string;
}

interface MultipleChoicesTextProps {
  choices: TextChoice[];
  onSelectionChange?: (selectedChoice: string | number | null) => void;
  placeholder?: string;
  title?: string;
  className?: string;
}

export default function MultipleTextChoicesDropdown({
  choices,
  onSelectionChange,
  placeholder = "Select your answer",
  title,
  className = ""
}: MultipleChoicesTextProps) {

  const handleValueChange = (value: string): void => {
    // Find the choice by converting back from string
    const selectedChoice = choices.find(choice => choice.id.toString() === value);
    onSelectionChange?.(selectedChoice?.id || null);
  };

  if (!choices || choices.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="p-4 text-center text-gray-500">
          No choices available
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Title */}
      {title && (
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            {title}
          </label>
        </div>
      )}

      {/* Shadcn Select Component */}
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {choices.map((choice) => (
            <SelectItem 
              key={choice.id} 
              value={choice.id.toString()}
              className="cursor-pointer"
            >
              <div className="text-sm leading-relaxed py-1">
                {choice.text}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}