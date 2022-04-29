import { React, Link, Axios, useNavigate } from '../client-imports';
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';
import '../styles/pages/login.css';

export const Login = () => {
  const navigate = useNavigate();

  const loginUser = () => {
    Axios.post('/auth/login').then(data => {
      if(data.data.success) {
        localStorage.setItem('token', data.data.token);
        navigate('/dashboard');
      }
    });
  };

  const responseGoogle = res => {
    const profile = res.profileObj;
    const userData = {
      name: profile.name,
      email: profile.email,
      googleSignIn: true
    }

    // If profile object exists then send it to our registration api route
    if(profile) {
      Axios.post('/auth/login', userData).then(data => {
        if(data.data.success) {
          localStorage.setItem('token', data.data.token);
          navigate('/dashboard');
        }
      });
    }
    return;
  }

  return (
    <div className="login-main-container">
      <div className="login-container">
        <div className="login-sub-container">
          <h1 className="login-title">Login</h1>
          <form id="form" method="POST" action="/auth/login">
              <input className="form-input email-input" type="text" name="email" placeholder="Email..."/>

              <div className="rand-cont">
                <input className="form-input password-input" type="password" name="password" placeholder="Password..."/>
                <Link to="/reset-password" className="link">Forgot password?</Link>
              </div>
            <button type="submit" className="btn-submit btn-login" onClick={loginUser}>Login</button>
          </form>

          <div className="line-container">
            <span className="line line1"></span>
            <span className="btw-line">or</span>
            <span className="line line2"></span>
          </div>


          <GoogleLogin
            render={renderProps => (
              <GoogleButton onClick={renderProps.onClick} style={{
                borderRadius: "30px",
                cursor: "pointer",
                marginTop: "30px"
              }}>Sign in with Google</GoogleButton>
            )}
            
            clientId={process.env.REACT_APP_OAUTH_SECRET}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            isSignedIn={false}
            cookiePolicy={'single_host_origin'}>
          </GoogleLogin>

          <p className="register-txt">
            Need an account?{" "}
            <Link to="/register" className="link">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}