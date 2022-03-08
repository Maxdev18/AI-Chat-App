// Imports
// Remember to check if compiles normally
import { BrowserRouter, React, Routes, Route, io } from './client-imports';
import ReactDOM from 'react-dom';
import { Landing, About, WhyAIPage } from './client-imports';

import './styles/index.css';

const socket = io('http://localhost:5000');

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/why-ai" element={<WhyAIPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));