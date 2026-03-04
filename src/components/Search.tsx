import { Link } from 'react-router-dom';
import { useTree } from '../context/TreeContext';
import { isFile } from '../types';
import { formatSize } from '../utils/treeUtils';

const Search: React.FC = () => {
  const { searchQuery, setSearchQuery, searchResults } = useTree();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Search</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {searchQuery && (
        <div className="mt-4">
          <strong className="text-lg">Results ({searchResults.length}):</strong>
          {searchResults.length === 0 ? (
            <p className="text-gray-500 mt-2">No results</p>
          ) : (
            <ul className="pl-4 mt-2 space-y-1">
              {searchResults.map(({ node, path }) => (
                <li key={path} className="mb-2">
                  <Link to={`/tree/${encodeURIComponent(path)}`} className="text-blue-600 hover:underline">
                    {path}
                  </Link>
                  {isFile(node) && (
                    <span className="ml-2 text-gray-500 text-sm">
                      ({formatSize(node.size)})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;