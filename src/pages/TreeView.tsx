import FileTree from '../components/FileTree';
import Search from '../components/Search';
import Layout from '../components/Layout';
import BackLink from '../components/BackLink';

const TreeView: React.FC = () => {
  return (
    <Layout>
      <BackLink to="/">Home</BackLink>
      <h1 className="text-3xl font-bold mb-6">Tree View</h1>
      <Search />
      <FileTree />
    </Layout>
  );
};

export default TreeView;