export const MentimeterResults = ({ votingCode }: { votingCode: string }) => {
  return (
    // <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
    //   <div className="h-screen bg-pink-300">Hello </div>
    //   {/* <iframe
    //     src={`https://www.mentimeter.com/app/presentation/al1dtnbckkjiux23f25uhz93euywspq8/edit?source=share-modal`}
    //     style={{
    //       position: "absolute",
    //       top: 0,
    //       left: 0,
    //       width: "100%",
    //       height: "100%",
    //       border: 0,
    //     }}
    //     allowFullScreen
    //     title="Mentimeter Results"
    //   /> */}
    //      <iframe
    //     src={`https://www.mentimeter.com/app/presentation/al1dtnbckkjiux23f25uhz93euywspq8/edit?source=share-modal`}
    //     style={{
    //       width: '100%',
    //       height: '600px',
    //       border: 0
    //     }}
    //     title="Mentimeter"
    //   />
    // </div>

    <div style={{ width: "100%", backgroundColor: "#f0f0f0" }}>
        <h1>Hello</h1>
      <iframe
        src={`https://www.mentimeter.com/app/presentation/al1dtnbckkjiux23f25uhz93euywspq8/embed`}
        style={{
          width: "100%",
          height: "600px",
          border: "1px solid #ccc",
          display: "block",
        }}
        allowFullScreen
        title="Mentimeter"
      />

      <div>a re reee</div>
    </div>
  );
};

// Usage
