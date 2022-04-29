import { React, Router, Routes, Route, io, gapi, Axios } from './client-imports';
import ReactDOM from 'react-dom';
import { Landing, About, WhyAIPage, Guidelines, HowWasItMade, Contact, Commands, Login, Register } from './client-imports';
import { Dashboard } from "./client-imports";
import { UserContext, UserLoggedIn } from './contexts/contexts';

import './styles/index.css';

const socket = io('http://localhost:5000');

function App() {
  let [isLoggedIn, setIsLoggedIn] = React.useState(false);
  let [user, setUser] = React.useState(null);

  Axios.defaults.baseURL = "http://localhost:5000";
  const token = localStorage.getItem('token');

  React.useEffect(()=> {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_OAUTH_SECRET,
        scope: "https://www.googleapis.com/auth/userinfo.email"
      })
    }
    gapi.load('client:auth2', start);

    const token = localStorage.getItem('token');

    if(token) {
      async function retrieveUser() {
        const user = await Axios.get('/auth/checkauth', { params: { token } })
          .then(res => {
            return res;
          })
          .catch(err => {
            console.error(err);
          });

          console.log(user);
          if(user) {
            setUser(user);
            setIsLoggedIn(true);
          } else {
            console.log("clearing local...");
            localStorage.clear();
            setUser(null);
            setIsLoggedIn(false);
            window.location.pathname = '/login';
          }
      }
      retrieveUser();
    }
  }, []);

  return (
      <Router>
        <UserLoggedIn.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <UserContext.Provider value={{user, setUser}}>
          <Routes>
            <Route exact path="/" element={<Landing/>} />
            <Route exact path="/about" element={<About/>} />
            <Route exact path="/why-ai" element={<WhyAIPage/>} />
            <Route exact path="/guidelines" element={<Guidelines/>} />
            <Route exact path="/blog" element={<HowWasItMade/>} />
            <Route exact path="/contact" element={<Contact/>} />
            <Route exact path="/learn-ai-commands" element={<Commands/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
        </UserContext.Provider>
        </UserLoggedIn.Provider>
      </Router>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));