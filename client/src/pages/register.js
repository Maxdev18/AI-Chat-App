import { React, Link, Axios, useNavigate } from '../client-imports';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import GoogleButton from 'react-google-button';
import '../styles/pages/register.css';

export const Register = () => {
  // Form data
  let [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const navigate = useNavigate();

  const registerUser = (formData) => {
    Axios.post('/auth/register', formData)
      .then(data => {
        console.log(data);
        if(data.data.success) {
          localStorage.setItem('token', data.data.token);
          navigate('/dashboard');
        }
      }).catch(err => {
        console.error(err);
      });
  }

  const responseGoogle = res => {
    const profile = res.profileObj;
    const userdata = {
      name: profile.name,
      email: profile.email,
      imageUrl: profile.imageUrl,
      googleSignIn: true
    }

    Axios.post('/auth/register', userdata).then(data => {
      if(data.data.success) {
        localStorage.setItem('token', JSON.stringify(data.data.token));
        navigate('/dashboard');
      }
    }).catch(err=> {
        console.error(err);
      });
  }
  // const logout = () => {
  //   Axios.get('/auth/logout', {
  //     withCredentials: true
  //   });
  // }

  return (
    <div className="register-main-container">
      <div className="register-container">
        <div className="register-sub-container">
          <h1 className="login-title">Register</h1>
          <div id="form">
            <input className="form-input name-input" type="text" name="name" placeholder="Name..." value={form.name} onChange={handleChange}/>
            <input className="form-input email-input" type="email" name="email" placeholder="Email..." value={form.email} onChange={handleChange}/>
            <div className="rand-cont">
              <input className="form-input password-input" type="password" name="password" placeholder="Password..." value={form.password} onChange={handleChange}/>
              <input className="form-input password-input" type="password" name="confirmPassword" placeholder="Confirm password..." value={form.confirmPassword} onChange={handleChange}/>
              <Link to="/login" className="link">Already have an account?</Link>
            </div>
            <button type="submit" className="btn-submit btn-login" onClick={() => registerUser(form)}>Register</button>
          </div>

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
          {/* <GoogleLogout
            clientId={process.env.OAUTH_SECRET}
            buttonText="Logout"
            onLogoutSuccess={logout}>
        </GoogleLogout> */}
        </div>
      </div>
    </div>
  )
}