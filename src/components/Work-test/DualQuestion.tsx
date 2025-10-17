import { useState } from 'react';
import { Check } from 'lucide-react';
import Question from "./Question";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface QuestionData {
  id: string;
  question: string;
  audio?: string;
  image?: string;
}

interface AnswerForm {
  questionId: string;
  answer: string;
}

interface DualQuestionProps {
  questions?: QuestionData[];
  onSubmit?: (answerForm: AnswerForm) => void;
}

export default function DualQuestion({ 
  questions = [
    {
      id: "q1",
      question: "Now the text should be perfectly aligned with the checkbox vertically, while maintaining the left alignment for text-only choices and center alignment for image choices.?"
    },
    {
      id: "q2", 
      question: "Now the text should be perfectly aligned with the checkbox vertically, while maintaining the left alignment for text-only choices and center alignment for image choices.?",
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    }
  ],
  onSubmit
}: DualQuestionProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleQuestionSelect = (questionIndex: number) => {
    setSelectedQuestion(questionIndex);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = (questionIndex: number) => {
    const questionData = questions[questionIndex];
    const answer = answers[questionData.id] || '';
    const answerForm: AnswerForm = {
      questionId: questionData.id,
      answer
    };
    
    console.log('Submitting:', answerForm);
    onSubmit?.(answerForm);
  };

  console.log("Selected question index:", selectedQuestion);

  return (
    <div className="space-y-6">
      {/* Question 1 */}
      <div className="relative bg-white">
        {/* Selection Checkbox */}
        <div className="absolute top-12 left-6 z-10">
          <div 
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
              selectedQuestion === 0
                ? 'bg-orange-500 border-orange-500'
                : 'bg-[#F2F1F0] border-gray-300 hover:border-gray-400 shadow-[0_-2px_4px_rgba(0,0,0,0.3)]'
            }`}
            onClick={() => handleQuestionSelect(0)}
          >
            {selectedQuestion === 0 && (
              <Check className="w-6 h-6 text-black" />
            )}
          </div>
        </div>

        {/* Question Content */}
        <div className={`px-12 ${selectedQuestion !== 0 ? 'opacity-60 pointer-events-none' : ''}`}>
          <Question question={questions[0].question} />
          
          {/* Answer Field - only enabled when selected */}
          <div >
            <Textarea 
              placeholder="Type your answer here..."
              disabled={selectedQuestion !== 0}
              className="min-h-[300px]"
              value={answers[questions[0].id] || ''}
              onChange={(e) => handleAnswerChange(questions[0].id, e.target.value)}
            />
          </div>
          
          {/* Submit Button - only enabled when selected */}
          <div className="flex justify-end py-6">
            <Button 
              disabled={selectedQuestion !== 0}
              onClick={() => handleSubmit(0)}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Question 2 */}
      <div className="relative bg-white">
        {/* Selection Checkbox */}
        <div className="absolute top-12 left-6 z-10">
          <div 
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
              selectedQuestion === 1
                ? 'bg-orange-500 border-orange-500'
                : 'bg-[#F2F1F0] border-gray-300 hover:border-gray-400 shadow-[0_-2px_4px_rgba(0,0,0,0.3)]'
            }`}
            onClick={() => handleQuestionSelect(1)}
          >
            {selectedQuestion === 1 && (
              <Check className="w-6 h-6 text-black" />
            )}
          </div>
        </div>

        {/* Question Content */}
        <div className={`px-12 ${selectedQuestion !== 1 ? 'opacity-60 pointer-events-none' : ''}`}>
          <Question
            question={questions[1].question}
            audio={questions[1].audio}
          />
          
          {/* Answer Field - only enabled when selected */}
          <div >
            <Textarea 
              placeholder="Type your answer here..."
              disabled={selectedQuestion !== 1}
              className="min-h-[300px]"
              value={answers[questions[1].id] || ''}
              onChange={(e) => handleAnswerChange(questions[1].id, e.target.value)}
            />
          </div>
          
          {/* Submit Button - only enabled when selected */}
          <div className="flex justify-end py-6">
            <Button 
              disabled={selectedQuestion !== 1}
              onClick={() => handleSubmit(1)}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}