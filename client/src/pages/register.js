import { React, Link, Axios } from '../client-imports';
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';
import '../styles/pages/register.css';

export const Register = () => {
  const registerUser = () => {

  }

  const responseGoogle = res => {
    const profile = res.profileObj;
    const userdata = {
      name: profile.name,
      email: profile.email,
      googleSignIn: true
    }

    console.log(profile)
    Axios.post('/auth/register', userdata);
  }

  return (
    <div className="register-main-container">
      <div className="register-container">
        <div className="register-sub-container">
          <h1 className="login-title">Register</h1>
          <form id="form" onClick={registerUser}>
            <input className="form-input name-input" type="text" name="name" placeholder="Name..."/>
            <input className="form-input email-input" type="email" name="email" placeholder="Email..."/>
            <div className="rand-cont">
              <input className="form-input password-input" type="password" name="password" placeholder="Password..."/>
              <input className="form-input password-input" type="password" name="confirm-password" placeholder="Confirm password..."/>
              <Link to="/login" className="link">Already have an account?</Link>
            </div>
            <button type="submit" className="btn-submit btn-login">Register</button>
          </form>

          <GoogleLogin 
            render={renderProps => (
              <GoogleButton onClick={renderProps.onClick} style={{
                borderRadius: "30px",
                cursor: "pointer",
                marginTop: "30px"
              }}>Sign up with Google</GoogleButton>
            )}
            clientId={process.env.OAUTH_SECRET}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </div>
  )
}