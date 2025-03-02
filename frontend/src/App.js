import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import MembersPage from './components/MembersPage';
import ResourcesPage from './components/ResourcesPage';
import TasksPage from './components/TasksPage';
import AiPageDefault from './components/AiPageDefault';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-[#fff2e1]">
        <div className="bg-gray-800 text-white w-full p-4">
          <nav className="mt-4">
            <ul className="flex space-x-4">
              <li><Link to="/" className="text-white">Home</Link></li>
              <li><Link to="/members" className="text-white">Members</Link></li>
              <li><Link to="/resources" className="text-white">Resources</Link></li>
              <li><Link to="/tasks" className="text-white">Tasks</Link></li>
              <li><Link to="/ai" className="text-white">Ai</Link></li>
            </ul>
          </nav>
        </div>

        <div className="flex-1 p-6 content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/ai" element={<AiPageDefault />} />
          </Routes>
        </div>
      </div>
      {/* <footer>
        © 2025 Copyright Jacob Becker & Adithya Hanakere Virupaksha
      </footer> */}
    </Router>
  );
}

export default App;