// Imports
// Remember to check if compiles normally
import { React, Router, Routes, Route, io, gapi } from './client-imports';
import ReactDOM from 'react-dom';
import { Landing, About, WhyAIPage, Guidelines, HowWasItMade, Contact, Commands, Login, Register } from './client-imports';

import './styles/index.css';

const socket = io('http://localhost:5000');

function App() {

  React.useEffect(()=> {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_OAUTH_SECRET,
        scope: "https://www.googleapis.com/auth/userinfo.email"
      })
    }

    gapi.load('client:auth2', start)
  }, []);

  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/why-ai" element={<WhyAIPage/>} />
          <Route path="/guidelines" element={<Guidelines/>} />
          <Route path="/blog" element={<HowWasItMade/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/learn-ai-commands" element={<Commands/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));