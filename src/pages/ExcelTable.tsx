import { Download } from 'lucide-react';

const ExcelTable = () => {
  // Mock product data
  const products = [
    {
      productID: 'PRD001',
      name: 'Wireless Bluetooth Headphones',
      price: 129.99,
      detail: 'High-quality over-ear headphones with active noise cancellation and 30-hour battery life',
      available: true
    },
    {
      productID: 'PRD002',
      name: 'Gaming Mechanical Keyboard',
      price: 89.99,
      detail: 'RGB backlit mechanical keyboard with Cherry MX switches, perfect for gaming and typing',
      available: true
    },
    {
      productID: 'PRD003',
      name: 'Smartphone Stand',
      price: 24.99,
      detail: 'Adjustable aluminum phone stand compatible with all smartphone sizes and tablets',
      available: false
    },
    {
      productID: 'PRD004',
      name: '4K Webcam',
      price: 199.99,
      detail: 'Ultra HD webcam with auto-focus, built-in microphone, and wide-angle lens for streaming',
      available: true
    },
    {
      productID: 'PRD005',
      name: 'Portable Power Bank',
      price: 45.99,
      detail: '20000mAh fast-charging power bank with multiple USB ports and LED display',
      available: true
    }
  ];

  const downloadCSV = () => {
    // Create CSV headers
    const headers = ['Product ID', 'Name', 'Price', 'Detail', 'Available'];
    
    // Convert data to CSV format
    const csvData = [
      headers.join(','), // Header row string
      ...products.map(product => [
        `"${product.productID}"`,
        `"${product.name}"`,
        product.price,
        `"${product.detail.replace(/"/g, '""')}"`, // Escape quotes in detail
        product.available ? 'Yes' : 'No'
      ].join(','))
    ].join('\n');

    console.log("CSV Data:\n", csvData); // Debugging line

    // Create and download the file
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `product-catalog-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
        <button 
          onClick={downloadCSV}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <Download className="w-4 h-4" />
          Download CSV
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <caption className="px-6 py-4 text-sm text-gray-600 bg-gray-50 border-b">
              A list of available products in our catalog - Click download to export as CSV.
            </caption>
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r">
                  Product ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r">
                  Detail
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Available
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.productID} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r">
                    {product.productID}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600 border-r">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md border-r">
                    {product.detail}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.available
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}
                    >
                      {product.available ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
        <div>
          Total Products: {products.length} | In Stock: {products.filter(p => p.available).length}
        </div>
        <div className="flex items-center gap-2 text-xs bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          CSV Export Ready
        </div>
      </div>
    </div>
  );
};

export default ExcelTable;