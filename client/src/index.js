import ReactDOM from 'react-dom';
import * as React from 'react';
import './styles/home.css';
import io from "socket.io-client";

const socket = io('http://localhost:4000');

function App() {
  let [text, setText] = React.useState('');

  socket.on('message', (data) => {
    setText(data);
  });

  return (
    <div className="App">
      {text}
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));