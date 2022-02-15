// Imports
// Remember to check if compiles normally
import { React, Router, Route, io } from './client-imports';
import { Landing } from './client-imports';

import './styles/home.css';

const socket = io('http://localhost:5000');

function App() {

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Landing} />

      </Router>  
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));