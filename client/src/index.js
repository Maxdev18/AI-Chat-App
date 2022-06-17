import { React, Router, Routes, Route, gapi, Axios } from './client-imports';
import ReactDOM from 'react-dom';
import { Landing, About, WhyAIPage, Guidelines, HowWasItMade, Contact, Commands, Login, Register } from './client-imports';
import { Dashboard } from "./client-imports";
import { UserContext, UserLoggedIn } from './contexts/contexts';

import './styles/index.css';

let endpoint;
if(window.location.hostname === 'localhost') {
  Axios.defaults.baseURL = "http://localhost:5000";
  endpoint = 'http://localhost:5000';
} else {
  Axios.defaults.baseURL = "https://chattingai-backend.herokuapp.com"; 
  endpoint = 'https://chattingai-backend.herokuapp.com';
}

function App() {
  let [isLoggedIn, setIsLoggedIn] = React.useState(false);
  let [user, setUser] = React.useState(null);
  let [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(()=> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');

    if(token) {
      // Connect to Google API
      function start() {
        gapi.client.init({
          clientId: process.env.REACT_APP_OAUTH_SECRET,
          scope: "https://www.googleapis.com/auth/userinfo.email"
        })
      }
      gapi.load('client:auth2', start);

      // Check authentication
      async function retrieveUser() {
        const userDB = await Axios.get('/auth/checkauth', { params: { token: JSON.parse(token), id: JSON.parse(userID) } })
          .then(res => {
            return res.data;
          })
          .catch(err => {
            console.error(err);
          });

        if(userDB) {
          setUser(userDB._doc);
          setIsLoggedIn(true);
        } else {
          localStorage.clear();
          setUser(null);
          setIsLoggedIn(false);
          window.location.pathname = '/login';
        }
      }
      retrieveUser();
    }
    setIsLoading(false);
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
          </Routes>
            {isLoading ? (
              <div className="App">Loading...</div>
            ) : (
              <Routes>
                <Route path="/dashboard/:id" element={<Dashboard endpoint={endpoint}/>} />
              </Routes>
            )}
            
        </UserContext.Provider>
        </UserLoggedIn.Provider>
      </Router>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));