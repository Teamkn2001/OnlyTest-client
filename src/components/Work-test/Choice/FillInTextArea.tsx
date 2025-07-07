import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function FillInTextArea() {
  return (
    <div className="px-10">
      <Textarea
        className="w-full min-h-44"
        placeholder="Type your answer here"
      ></Textarea>
    </div>
  );
}
