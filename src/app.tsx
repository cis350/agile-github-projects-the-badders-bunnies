import './app.css';
import Home from './pages/home.jsx';
import Post from './post.tsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
    
  );
}

export default App;