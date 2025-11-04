
export default function MentimeterInput({ votingCode }: { votingCode: string }) {
  return (
   <div>
      <iframe
        src={`https://www.menti.com/${votingCode}`}
        style={{
          width: "100%",
          height: "600px",
          border: "1px solid #ccc",
          display: "block",
        }}
        allowFullScreen
        title="Mentimeter"
      />
    </div>
  )
}

// voting url
// https://www.menti.com/alnuj8top2k2

