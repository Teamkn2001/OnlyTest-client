import FillInBlank from "@/components/Work-test/Choice/FillInBlank";
import FillInTextArea from "@/components/Work-test/Choice/FillInTextArea";
import MultipleTextChoicesDropdown from "@/components/Work-test/Choice/MultipleTextChoicesDropdown";
import MultipleTextChoices from "@/components/Work-test/Choice/MultipleTextChoices";
import SpeakingAnswer from "@/components/Work-test/Choice/SpeakingAnswer";
import Passage from "@/components/Work-test/Passage";
import Question from "@/components/Work-test/Question";
import DualQuestion from "@/components/Work-test/DualQuestion";

// Example usage with different prop combinations
export const ExampleUsage = () => {
  const textChoices = [
    { id: "a", text: "Option A" },
    { id: "b", text: "Option B" },
    { id: "c", text: "Option C" },
    { id: "d", text: "Option D" },
  ];

  // Multiple choices TextSingle selection (like your image)
  const textOptions = [
    {
      id: 1,
      text: "This makes me feel less excited about going to work in the morning",
    },
    { id: 2, text: "The article was about Doctors Without Borders" },
    { id: 3, text: "This would be perfect" },
    { id: 4, text: "This would make it more interesting and exciting" },
    { id: 5, text: "I think I'm going to take the leap" },
    { id: 6, text: "My friend told me to become a professional athlete" },
  ];



  return (
    <div className="space-y-6 p-8 bg-[#D9D9D9]">
      {/* Sample Question */}
      <Passage
        audio="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        // image="https://picsum.photos/id/237/200/300"
        title="Sample Question "
        instruction={"Instructions: Read the passage and fill the blank words."}
        passage="My name is Carlos, and I have just moved to this city last month for a new job. Everything (1) ______ still quite new to me. On weekdays, my routine (2) ______ quite early. I usually wake up around 6:30 AM. First, I always make some coffee, and then I (3) ______ the local news on my tablet. I believe it’s a good way to learn about what’s happening in my new surroundings.
I work as a software developer, and my office is downtown. I (4) ______ take the bus to work because I don’t have a car yet. The bus ride is usually about 40 minutes. In the evenings, I sometimes (5) ______ different neighborhoods to get to know the city better. I hope to make some new friends soon"
      />
      <div className="bg-white py-8">
        <Question
          question="Now the text should be perfectly aligned with the checkbox vertically, while maintaining the left alignment for text-only choices and center alignment for image choices.?"
          // audio="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
          // image="https://picsum.photos/id/1/200/300"
        />

        {/* <MultipleTextChoicesDropdown choices={CapitalCity} className="px-8" /> */}

        {/* <MultipleImageChoices
          choices={imageChoices}
          // title="Choose the correct answer"
          allowMultiple={false}
          columns={2}
        /> */}

        <MultipleTextChoices
          choices={textChoices}
          onSelectionChange={(selected) => console.log("Selected:", selected)}
        />
      </div>

      <hr className="h-4 bg-red-500"></hr>

      <DualQuestion />

      <hr className="h-4 bg-red-500"></hr>
      <div className="text-center text-2xl ">Component part</div>
      {/* Title only */}
      <Passage title="Listening Practice" />

      {/* Title with audio */}
      <Passage title="Audio Exercise" audio="https://example.com/audio.mp3" />

      {/* Title with passage */}
      <Passage
        title="Reading Comprehension"
        passage="Instructions: Listen to Lin's interview about her first impressions and typical day as a new exchange student. Then, choose the best answer (A–D) for each question (1-5)."
      />

      {/* All props */}
      <Passage
        title="Complete Exercise"
        audio="https://example.com/audio.mp3"
        passage="Instructions: Listen to Lin's interview about her first impressions and typical day as a new exchange student. Then, choose the best answer (A–D) for each question (1-5)."
        image="https://picsum.photos/id/237/200/300"
      />

      {/* Example 1: Text Only */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          1. Text Only Question
        </h2>
        <Question question="What is the capital of France? This is a geography question that tests your knowledge of European capitals. Paris has been the capital since the 12th century and is known for its iconic landmarks like the Eiffel Tower." />
      </div>

      {/* Example 2: Audio Only */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          2. Audio Only Question
        </h2>
        <Question audio="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" />
      </div>

      {/* Example 3: Image Only */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          3. Image Only Question
        </h2>
        <Question image="https://picsum.photos/seed/picsum/200/300" />
      </div>

      {/* Example 4: Text + Audio */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          4. Text + Audio Question
        </h2>
        <Question
          question="Listen to the audio clip and answer: What sound do you hear?"
          audio="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        />
      </div>

      {/* Example 5: Text + Image */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          5. Text + Image Question
        </h2>
        <Question
          question="Look at the image above and identify what you see. Describe the colors, shapes, and any text visible in the image."
          image="https://picsum.photos/200/300"
        />
      </div>

      {/* Example 6: All Props */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          6. Complete Question (Text + Audio + Image)
        </h2>
        <Question
          question="This is a comprehensive question that includes text, audio, and an image. Listen to the audio, examine the image, and provide your answer based on all the information provided."
          audio="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
          image="https://picsum.photos/200/300"
        />
      </div>

      {/* Example 7: No Props */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          7. No Data Provided
        </h2>
        <Question />
      </div>

      {/* Speaking Answer */}
      <SpeakingAnswer
        onRecordingComplete={(blob) => {
          console.log("Recording completed:", blob);
          // Save the recording or process it
        }}
        onRecordingStart={() => console.log("Recording started")}
        onRecordingStop={() => console.log("Recording stopped")}
        maxDuration={120} // 2 minutes
      />

      {/* FIll in blank */}
      <FillInBlank />

      {/* Multiple Text DropDown */}
      <MultipleTextChoicesDropdown
        choices={textOptions}
        placeholder="Select your answer"
        title="Select your answer"
        onSelectionChange={(selected) => console.log("Selected:", selected)}
      />

      <FillInTextArea />
    </div>
  );
};

export default Passage;
