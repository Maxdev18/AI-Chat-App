// Imports
// Remember to check if compiles normally
import { Router, Switch, Route, io } from './client-imports';
import ReactDOM from 'react-dom';
import { Landing, About, WhyAIPage, Guidelines, HowWasItMade, Contact, Commands, Login } from './client-imports';

import './styles/index.css';

const socket = io('http://localhost:5000');

function App() {

  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/about" component={About} />
          <Route path="/why-ai" component={WhyAIPage} />
          <Route path="/guidelines" component={Guidelines} />
          <Route path="/blog" component={HowWasItMade} />
          <Route path="/contact" component={Contact} />
          <Route path="/learn-ai-commands" component={Commands} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));