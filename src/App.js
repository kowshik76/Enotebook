import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { useState } from 'react';
import Enotebook from './components/Enotebook';

function App() {
  const [alert, setAlert] = useState(null);

  const ShowAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />

        <div className="container">
          <Routes>
            {/* Redirect root to /enotebook */}
            <Route path="/" element={<Navigate to="/enotebook" />} />

            <Route path="/enotebook" element={<Enotebook ShowAlert={ShowAlert} />} />
            <Route path="/home" element={<Home ShowAlert={ShowAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login ShowAlert={ShowAlert} />} />
            <Route path="/signup" element={<Signup ShowAlert={ShowAlert} />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
