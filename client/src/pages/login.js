import { React, Link, Axios, useNavigate } from '../client-imports';
import { UserContext } from '../contexts/contexts';
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';
import '../styles/pages/login.css';

export const Login = () => {
  let { user, setUser } = React.useContext(UserContext);
  let [form, setForm] = React.useState({
    email: '',
    password: ''
  });

  React.useEffect(() => {
    if(user) {
      navigate(`/dashboard/${user._id}`)
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const navigate = useNavigate();

  const loginUser = (formData) => {
    Axios.post('/auth/login', formData).then(data => {
      if(data.data.success) {
        console.log(data)
        localStorage.setItem('token', JSON.stringify(data.data.token));
        localStorage.setItem('userID', JSON.stringify(data.data._doc._id));
        setUser(data.data._doc);
        navigate(`/dashboard/${data.data._doc._id}`);
      }
    })
    .catch(err => {
      if(err) console.error(err);
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
          localStorage.setItem('token', JSON.stringify(data.data.token));
          localStorage.setItem('userID', JSON.stringify(data.data._doc._id));
          setUser(data.data._doc);
          navigate(`/dashboard/${data.data._doc._id}`);
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
          <div id="form">
              <input className="form-input email-input" type="text" name="email" placeholder="Email..." value={form.email} onChange={handleChange}/>

              <div className="rand-cont">
                <input className="form-input password-input" type="password" name="password" placeholder="Password..." value={form.password} onChange={handleChange}/>
                <Link to="/reset-password" className="link">Forgot password?</Link>
              </div>
            <button type="submit" className="btn-submit btn-login" onClick={() => loginUser(form)}>Login</button>
          </div>

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