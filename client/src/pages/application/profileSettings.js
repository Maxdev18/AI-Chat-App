import { React, Axios, useNavigate } from '../../client-imports';
import { UserContext } from '../../contexts/contexts';
import '../../styles/pages/application/profileSettings.css';

export const ProfileSettings = () => {
  const { user, setUser } = React.useContext(UserContext);
  let [ name, setName ] = React.useState(user.name);
  let [ bio, setBio ] = React.useState(user.settings.bio);
  const navigate = useNavigate()

  let profileData = {
    id: user._id,
    name,
    bio
  }

  function logout() {
    localStorage.clear();
    navigate('/login');
  }

  function updateProfile() {
    Axios.post('/api/application/update/update-profile', profileData)
      .then(() => {
        setUser(prev => ({
          ...prev,
          settings: {
            ...prev.settings,
            bio: profileData.bio
          }
        }))
      })
      .catch(err=> {
        if(err) console.error(err);
      });
  }

  function updateProfilePic(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', user._id);

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };

    // Post image to the server and to database
    Axios.post('/api/application/update/update-profile', formData, config)
      .then(data => {
        setUser(prev => ({
          ...prev,
          settings: {
            ...prev.settings,
            profilePic: {
              ...prev.settings.profilePic,
              pic: data.data.imgUrl
            }
          }
        }))
      })
      .catch(err => {
        if(err) console.error(err);
      });
  }

  const renderProfile = () => {
    const profileStyles = {
      backgroundColor: '#' + user.settings.profilePic.hex
    }

    if(user.googleSignIn) {
      return (
        <img src={`${user.settings.profilePic.pic}`} className="user-profile-setting" alt=""></img>
      )
    } else {
      return (
        <label htmlFor="inputTag" className="user-profile-setting" onChange={updateProfilePic}>
          {user.settings.profilePic.pic.length > 1 ? (
            <>
              <img className="profileImg" src={user.settings.profilePic.pic} alt="" />
              <input id="inputTag" type="file" accept="image/png, image/jpg, image/gif, image/jpeg"/>
            </>
          ) : (
            <div className="noProfileImg" style={profileStyles}>
              {user.settings.profilePic.pic}
              <input id="inputTag" type="file" accept=".png, .jpg, .jpeg" name="file"/>
            </div>
          )}
        </label>
      )
    }
  }

  return (
    <div className="profile-settings-container">
      <div className="profile-cont">
        {user.settings.profilePic.pic ? renderProfile() : null}
        <div className="input-profile-container">
          <span>Biography</span>
          <textarea className="bio" placeholder="Your bio..." maxLength="300" value={bio} onChange={e => setBio(e.target.value)} />
        </div>
      </div>
      <div className="profile-desc">
        <div className="input-profile-container input-profile-main-cont">
          <span>Name</span>
          <input value={name} placeholder="Name..." onChange={e => setName(e.target.value)}/>
        </div>
        <div className="input-profile-main-cont">
          <p>{"ID: " + user.userAppId}</p>
          <p>Share your id with someone you know to start a converstion!</p>
          <p>Warning: Only share with people you know so you won't get spams from uknown sources or hackers.</p>
        </div>
      </div>
      <div className="save-btn-cont">
        <button className="save-btn" onClick={updateProfile}>Save</button>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}