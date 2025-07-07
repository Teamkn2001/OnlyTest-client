import PDFControls from "@/components/PDFControl";

export default function PDF() {
 
  return (
    <div>
         <div className="min-h-screen bg-gray-100">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          React-PDF Demo
        </h1>
        <PDFControls />
      </div>
    </div>
    </div>
  );
}
