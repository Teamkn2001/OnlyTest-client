// import MentimeterInput from "./mentimeter/MentimeterInput";
import MentimeterBox from "./MentimeterBox";
// import { MentimeterResults } from "./mentimeter/MentimeterResult";
import Temp from "./Temp";

const MentimeterEmbed = ({ votingCode }: { votingCode: string }) => {
  console.log("voting code", votingCode);
  return (
    <div className=" flex flex-col gap-16 px-48">
    
      {/* <MentimeterResults votingCode={votingCode} /> */}
      {/* <MentimeterResults votingCode="74910274" /> */}
      {/* <MentimeterInput votingCode={votingCode} /> */}
      <MentimeterBox />
      <Temp />
    </div>
  );
};

export default MentimeterEmbed;
