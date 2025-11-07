import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import NewsCard from "@/components/shares/NewsCard";

const questions = [
  {
    id: 1,
    question: "What is the capital city of France?",
    choices: ["Berlin", "Paris", "Rome", "Madrid"],
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
  },
  {
    id: 3,
    question: "Who wrote 'To Kill a Mockingbird'?",
    choices: [
      "Harper Lee",
      "George Orwell",
      "Mark Twain",
      "J.K. Rowling",
    ],
  },
  {
    id: 4,
    question: "Which element has the chemical symbol 'O'?",
    choices: ["Oxygen", "Gold", "Iron", "Silver"],
  },
  {
    id: 5,
    question: "Which language is primarily used for styling web pages?",
    choices: ["HTML", "CSS", "Python", "SQL"],
  },
];

export default function Exam() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: number, choice: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choice }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Submitted answers:", answers);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-100 py-10 px-4">

      <NewsCard
  image_url="https://assets-prd.ignimgs.com/2024/02/13/live-action-miles-morales-movie-update-1707829705636.jpg"
  title="Mandelson was not interviewed for US ambassador job"
  published_date="วันที่ 7 พฤศจิกายน 2568"
  category="ข่าวหลัก"
/>
      <Card className="w-full max-w-2xl shadow-lg border border-slate-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-slate-700">
            📝 Exam
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {questions.map((q) => (
            <div key={q.id} className="space-y-3 border-b pb-4 last:border-0">
              <h2 className="text-lg font-semibold text-slate-800">
                {q.id}. {q.question}
              </h2>
              <RadioGroup
                value={answers[q.id] || ""}
                onValueChange={(choice) => handleSelect(q.id, choice)}
                className="space-y-2"
              >
                {q.choices.map((choice, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 rounded-lg border p-2 hover:bg-slate-50"
                  >
                    <RadioGroupItem
                      value={choice}
                      id={`q${q.id}-choice${idx}`}
                    />
                    <Label htmlFor={`q${q.id}-choice${idx}`}>{choice}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}

          <div className="pt-4 text-center">
            <Button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            >
              Submit
            </Button>
          </div>

          {submitted && (
            <div className="text-center text-green-600 font-medium mt-4">
              ✅ Answers submitted successfully!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
