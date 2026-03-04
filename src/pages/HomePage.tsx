import { Link } from 'react-router-dom';
import DropZone from '../components/DropZone';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">FileTree Explorer</h1>
      <DropZone />
      <div className="text-center mt-6">
        <Link to="/tree">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Go to tree view
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;