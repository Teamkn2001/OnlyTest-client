import React, { useState } from "react";

export default function PlayGrid() {
  const [columns, setColumns] = useState(5);
  const [rows, setRows] = useState(3);

  // Generate grid items
  const generateGridItems = () => {
    const totalItems = columns * rows;
    return Array.from({ length: totalItems }, (_, index) => index + 1);
  };

  const gridItems = generateGridItems();

  const mockDiv = Array.from({ length: 53 }, (_, index) => `Item ${index + 1}`);
  return (
    <div>
      /* With Grid (what we used) */
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-amber-300">Field 1</div> {/* Auto-positioned */}
        <div className="bg-green-300">Field 2</div> {/* Auto-positioned */}
        <div className="bg-blue-300">Field 3</div> {/* Auto-positioned */}
        <div className="bg-red-300">Field 4</div> {/* Auto-positioned */}
        <div className="col-span-2 bg-orange-500">Buttons</div>{" "}
        {/* Spans both columns */}
      </div>
      <div
        className="relative w-full m-auto"
        style={{ aspectRatio: "1/1", maxWidth: "600px" }}
      >
        <div className="grid absolute inset-0 grid-cols-10 grid-rows-7 text-center mt-4 bg-green-200">
          {mockDiv.map((item, index) => (
            <div>
              <div
                key={index}
                className="bg-blue-200 border border-gray-400 p-3 text-center"
              >
                {item}
              </div>
            </div>
          ))}
          <div></div>
          <div><div className="bg-blue-200 border border-gray-400 p-3 text-center">item X</div></div>
          
        </div>
      </div>
      {/* Playground */}
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Plain Grid Playground</h1>

        {/* Simple Controls */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Columns: {columns}
              </label>
              <input
                type="range"
                min="2"
                max="10"
                value={columns}
                onChange={(e) => setColumns(parseInt(e.target.value))}
                className="w-32"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Rows: {rows}
              </label>
              <input
                type="range"
                min="2"
                max="8"
                value={rows}
                onChange={(e) => setRows(parseInt(e.target.value))}
                className="w-32"
              />
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Grid: {columns} × {rows} = {columns * rows} items
          </p>
        </div>

        {/* Plain Grid - YOU CAN EDIT THE CLASSNAME BELOW */}
        <div
          className="grid gap-2 border-2 border-red-500 p-4"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          {gridItems.map((item, index) => (
            <div
              key={index}
              className="bg-blue-200 border border-gray-400 p-4 text-center"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Code Display */}
        <div className="mt-6 bg-gray-100 p-4 rounded text-sm font-mono">
          <p className="font-bold mb-2">Current Code:</p>
          <pre>{`<div 
  className="grid gap-2 border-2 border-red-500 p-4"
  style={{ 
    gridTemplateColumns: 'repeat(${columns}, minmax(0, 1fr))',
    gridTemplateRows: 'repeat(${rows}, minmax(0, 1fr))'
  }}
>
  {/* ${columns * rows} items */}
</div>`}</pre>
        </div>
      </div>
    </div>
  );
}
