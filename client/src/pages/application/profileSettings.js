import { React, Axios } from '../../client-imports';
import { UserContext } from '../../contexts/contexts';
import '../../styles/pages/application/profileSettings.css';

export const ProfileSettings = () => {
  const { user, setuser } = React.useContext(UserContext);
  let [ name, setName ] = React.useState(user.name);
  let [ bio, setBio ] = React.useState(user.settings.bio);
  let [ image, setImage ] = React.useState(user.settings.profilePic.pic);
  const reader = new FileReader();

  let profileData = {
    id: user._id,
    name,
    bio
  }

  function updateProfile() {
    Axios.post('/api/application/update/update-profile', profileData)
      .catch(err=> {
        if(err) console.error(err);
      });
  }

  function updateProfilePic(e) {
    e.preventDefault();
    const file = e.target.files[0];
    // this is not needed in this case but still a good habit
    reader.onloadend = () => {
      setImage(reader.result);
      console.log(file);
    }
    reader.readAsDataURL(file);

    Axios.post('/api/application/update/update-profile', file)
      .then(data => {
        const f = data.data.file;
        reader.onloadend = () => {
          setImage(reader.result)
          console.log(image);
        }
        reader.readAsDataURL(f);
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
        <img src={image} className="user-profile-setting" alt="profile image"></img>
      )
    } else {
      return (
        <label htmlFor="inputTag" className="user-profile-setting" onChange={updateProfilePic}>
          {image.length > 1 ? (
            <>
              <img className="profileImg" src={image} alt="profile image"/>
              <input id="inputTag" type="file" accept="image/png, image/jpg, image/gif, image/jpeg"/>
            </>
          ) : (
            <div className="noProfileImg" style={profileStyles}>
              {user.settings.profilePic.pic}
              <input id="inputTag" type="file" accept="image/png, image/jpg, image/gif, image/jpeg"/>
            </div>
          )}
        </label>
      )
    }
  }

  return (
    <div className="profile-settings-container">
      <div className="profile-cont">
        {user ? renderProfile() : null}
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
          <span>Your ID: </span>
          {user.userAppId}
        </div>
      </div>
      <div className="save-btn-cont">
        <button className="save-btn" onClick={updateProfile}>Save</button>
      </div>
    </div>
  )
}