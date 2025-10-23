import { MentimeterResults } from "./mentimeter/MentimeterResult";

const MentimeterEmbed = ({ votingCode }: { votingCode: string }) => {
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
      {/* <iframe
        src={`https://www.menti.com/${votingCode}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0
        }}
        allowFullScreen
        title="Mentimeter Presentation"
      /> */}

      {/* <MentimeterResults votingCode={votingCode} /> */}
      <MentimeterResults votingCode="74910274" />
    </div>
  );
};

export default MentimeterEmbed;
