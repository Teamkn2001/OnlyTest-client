import { Input } from "@/components/ui/input";
import React from "react";

export default function FillInBlank() {
  const [inputValue, setInputValue] = React.useState<string>("");
  console.log("Filled in blank input value:", inputValue);
  return (
    <div>
      {/* <Label className="text-lg font-semibold mb-2">Fill in the blank</Label> */}
      <Input
      className="w-full min-h-12"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your answer here"
      ></Input>
    </div>
  );
}
