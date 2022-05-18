import { React, Axios } from '../../client-imports';
import { UserContext } from '../../contexts/contexts';
import '../../styles/pages/application/profileSettings.css';

export const ProfileSettings = () => {
  const { user, setuser } = React.useContext(UserContext);
  let [ bio, setBio ] = React.useState('');
  let bool;

  React.useEffect(() => {
    
  });

  function updateProfile() {
    // axios post here
  }

  function updateProfilePic() {
    const profile = document.getElementById('');

  }

  const renderProfile = () => {
    const profileStyles = {
      backgroundColor: '#' + user.settings.profilePic.hex
    }

    if(user.googleSignIn) {
      return (
        <img src={user.settings.profilePic.pic} className="user-profile-setting" alt="profile image"></img>
      )
    } else {
      return (
        <div className="user-profile-setting" style={profileStyles} onClick={updateProfilePic}>
          {user.settings.profilePic.pic}
        </div>
      )
    }
  }

  return (
    <div className="profile-settings-container">
      <div className="profile-cont">
        {user ? renderProfile() : null}
        <textarea className="bio" placeholder="Your bio..." maxLength="300" value={bio} onChange={e => setBio(e.target.value)} />
      </div>
      <div className="profile-desc">

      </div>
    </div>
  )
}