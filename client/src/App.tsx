import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import FileView from './FileView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:id" element={<FileView />} />
      </Routes>
    </Router>
  );
}

export default App;