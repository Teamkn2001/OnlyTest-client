export const MentimeterResults = ({ votingCode }: { votingCode: string }) => {
  console.log("voting code", votingCode);
  return (
    <div>
      <iframe
        src={`https://www.mentimeter.com/app/presentation/aluqeyyuss96n1ntxfobmgkc1o2g7ckb/embed`}
        style={{
          width: "100%",
          height: "700px",
          // border: "1px solid #ccc",
          // display: "block",
        }}
        allowFullScreen
        title="Mentimeter"
      />
    </div>
  );
};

// result voting url
// https://www.mentimeter.com/app/presentation/aluqeyyuss96n1ntxfobmgkc1o2g7ckb/edit?source=share-modal
