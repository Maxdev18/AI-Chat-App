import { React, Link } from '../client-imports';
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';
import '../styles/pages/login.css';

export const Login = () => {
  const loginUser = () => {

  };

  const responseGoogle = res => {
    console.log(res);
  }

  return (
    <div className="login-main-container">
      <div className="login-container">
        <div className="login-sub-container">
          <h1 className="login-title">Welcome</h1>
          <form id="form" onClick={loginUser}>
              <input className="login-input eorp-input" type="text" name="uore" placeholder="Email or username..."/>

              <div className="rand-cont">
                <input className="login-input password-input" type="password" name="password" placeholder="Password..."/>
                <Link to="/reset-password" className="link">Forgot password?</Link>
              </div>
            <button type="submit" className="btn-submit btn-login">Login</button>
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
            clientId="1"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />

          <p className="register-txt">
            Need an account?{" "}
            <Link to="/register" className="link">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}