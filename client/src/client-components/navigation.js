import { React, Link } from '../client-imports';
import '../styles/components/navigation.css';

export const Navigation = (props) => {
  // Initialize state variables
  let [ loggedIn, setIsLoggedIn ] = React.useState(false);
  let [ menu, setMenu ] = React.useState(false);

  React.useEffect(() => {
    //setIsLoggedIn(props.loggedIn);
  }, []);

  /* Function checks if user is logged in, if so 
    renders "Go to dashboard", if not, then renders "login" */
  function checkLogin(login) {
    if(login) {
      return (
        <Link to={`/dashboard/`} className='btn-nav'>
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

  function toggleMenu() {
    setMenu(!menu);
  }

  return (
    <div className='main-nav-container'>
      <Link to='/' className='logo'>Chatting AI</Link>

      <div className={`container-nav-links ${menu ? 'showMenu' : ''}`}>
        <Link to='/why-ai' className='nav-link'>Why AI</Link>
        <Link to='/about' className='nav-link'>About</Link>
        <Link to='/contact' className='nav-link'>Contact</Link>
        {checkLogin(loggedIn)}
      </div>

      {/* Burger Menu */}
      <div className={`burger-container ${menu ? 'showX' : ''}`} onClick={toggleMenu}>
        <span className="burger-line burger-line-1"></span>
        <span className="burger-line burger-line-2"></span>
        <span className="burger-line burger-line-3"></span>
      </div>
    </div>
  );
}