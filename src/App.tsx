import { Routes, Route } from 'react-router-dom';
import { TreeProvider } from './context/TreeContext';
import Home from './pages//HomePage';
import TreeView from './pages/TreeView';
import NodeDetailPage from './pages/NodeDetailsPage';

function App() {
  return (
    <TreeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tree" element={<TreeView />} />
        <Route path="/tree/:nodePath" element={<NodeDetailPage />} />
      </Routes>
    </TreeProvider>
  );
}

export default App;