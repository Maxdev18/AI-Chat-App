import { React, Link } from '../client-imports';
import '../styles/navigation.css';

const Navigation = (props) => {
  // Initialize state variables
  let [ loggedIn, setIsLoggedIn ] = React.useState(false);

  useEffect(() => {
    setIsLoggedIn(props.loggedIn);
  }, []);

  /* Function checks if user is logged in, if so 
    renders "Go to dashboard", if not, then renders "login" */
  function checkLogin(login) {
    if(login) {
      return (
        <Link to={`/dashboard/${user._id}`} className='btn-nav'>
          Open Dashboard
        </Link>
      );
    } else {
      return (
        <Link to='/login' className='btn-nav'>
          Login
        </Link>
      )
    }
  }

  return (
    <div className='main-nav-container'>
      <h1 className='logo'>Chatting AI</h1>

      <div className='container-nav-links'>
        <Link to='/product' className='nav-link'>Product</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
        {checkLogin(loggedIn)}
      </div>
    </div>
  );
}

module.exports = Navigation;