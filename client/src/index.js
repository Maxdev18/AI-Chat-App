import ReactDOM from 'react-dom';
import * as React from 'react';
import './styles/home.css';
import io from "socket.io-client";

const socket = io('http://localhost:5000');

function App() {

  return (
    <div className="App">
      
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));