import { useState } from 'react';
import { useTree } from '../context/TreeContext';
import { FolderNode } from '../types';

const DropZone: React.FC = () => {
  const { setTree } = useTree();
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        validateAndSetTree(parsed);
      } catch {
        setError('Invalid JSON format');
      }
    };
    reader.readAsText(file);
  };

  const handlePaste = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      validateAndSetTree(parsed);
    } catch {
      setError('Invalid JSON format');
    }
  };

  const validateAndSetTree = (data: any) => {
    if (!data || typeof data !== 'object') {
      setError('Data is not an object');
      return;
    }
    if (data.type !== 'folder' || !Array.isArray(data.children)) {
      setError('Root must be a folder with a children array');
      return;
    }
    setTree(data as FolderNode);
    setError(null);
    setJsonInput('');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Load Directory Structure</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Choose JSON file:
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </label>
      </div>
      <div className="mb-4">
        <textarea
          rows={6}
          placeholder="Paste JSON here..."
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handlePaste}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Load from text
      </button>
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default DropZone;