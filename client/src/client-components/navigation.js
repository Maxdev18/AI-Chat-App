import { React, Link } from '../client-imports';
import { UserLoggedIn } from '../contexts/contexts';
import '../styles/components/navigation.css';
import { UserContext } from '../contexts/contexts';

export const Navigation = () => {
  // Initialize state variables
  const { user, setUser } = React.useContext(UserContext);
  let { isLoggedIn, setIsLoggedIn } = React.useContext(UserLoggedIn);
  let [ menu, setMenu ] = React.useState(false);

  /* Function checks if user is logged in, if so 
    renders "Go to dashboard", if not, then renders "login" */
  function checkLogin() {
    if(isLoggedIn) {
      return (
        <Link to={`/dashboard/id=${user._id}`} className='btn-nav'>
          Dashboard
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
        {checkLogin()}
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