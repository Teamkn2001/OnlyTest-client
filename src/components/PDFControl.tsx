import { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';

const sampleData = [
   { name: 'John Doe', email: 'john@example.com', role: 'Developer', status: 'Active', phone: '123-456-7890' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', status: 'Inactive', phone: '987-654-3210' },
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Manager', status: 'Active', phone: '555-123-4567' },
  { name: 'Bob Brown', email: 'bob@example.com', role: 'Developer', status: 'Active', phone: '222-333-4444' },
  { name: 'Charlie Davis', email: 'charlie@example.com', role: 'Support', status: 'Pending', phone: '444-555-6666' },
  { name: 'Diana Prince', email: 'diana@example.com', role: 'HR', status: 'Active', phone: '111-222-3333' },
  { name: 'Evan Wright', email: 'evan@example.com', role: 'Developer', status: 'Inactive', phone: '777-888-9999' },
  { name: 'Fiona Lee', email: 'fiona@example.com', role: 'Designer', status: 'Active', phone: '888-999-0000' },
  { name: 'George King', email: 'george@example.com', role: 'Manager', status: 'Active', phone: '666-777-8888' },
  { name: 'Hannah Scott', email: 'hannah@example.com', role: 'Support', status: 'Inactive', phone: '999-000-1111' },
  { name: 'Ian Black', email: 'ian@example.com', role: 'Developer', status: 'Pending', phone: '333-444-5555' },
  { name: 'Julia Green', email: 'julia@example.com', role: 'HR', status: 'Active', phone: '123-123-1234' },
  { name: 'Kevin White', email: 'kevin@example.com', role: 'Designer', status: 'Active', phone: '456-456-4567' },
  { name: 'Laura Hill', email: 'laura@example.com', role: 'Manager', status: 'Inactive', phone: '789-789-7890' },
  { name: 'Mike Adams', email: 'mike@example.com', role: 'Support', status: 'Active', phone: '321-654-9870' }
];

const PDFControls = () => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">PDF Generator</h2>
        
        <div className="flex gap-4 mb-6">
          {/* Simple Download Button */}
          <PDFDownloadLink
            document={<PDFDocument title="User Report" data={sampleData} />}
            fileName="user-report.pdf"
          >
            {({ loading }) => (
              <button
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
            )}
          </PDFDownloadLink>

          {/* Preview Toggle */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>

        {/* Sample Data Display */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Sample Data:</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Role</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.email}</td>
                    <td className="p-2">{item.role}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PDF Preview */}
        {showPreview && (
          <div className="border rounded-lg overflow-hidden">
            <h3 className="text-lg font-semibold p-4 bg-gray-50 border-b">PDF Preview:</h3>
            <div style={{ height: '600px' }}>
              <PDFViewer width="100%" height="100%">
                <PDFDocument title="User Report" data={sampleData} />
              </PDFViewer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFControls;