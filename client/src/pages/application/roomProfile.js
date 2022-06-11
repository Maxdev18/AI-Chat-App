import { React } from '../../client-imports';
import { Messages } from '../../contexts/contexts';
import '../../styles/pages/application/roomProfile.css';

export const RoomProfile = ({ profiles, rooms }) => {
  const { messages } = React.useContext(Messages);
  const profile = messages.roomId === rooms[messages.roomIndex]._id ? rooms[messages.roomIndex] : profiles[messages.roomIndex];

  async function deleteContact() {

  }

  function renderProfile() {
    const profileStyles = {
      backgroundColor: profile.settings.hex ? '#' + profile.settings.hex : '#' + profile.settings.profilePic.hex
    }

    if(profile.googleSignIn) {
      return (
        <img src={`${profile.settings.profilePic.pic}`} className="user-profile-setting" alt="profile"></img>
      )
    } else if(profile.settings.profilePic.pic?.length > 1) {
      return (
        <>
          <img className="profileImg" src={profile.settings.profilePic.pic} alt="profile" />
        </>
      )
    } else if(profile.settings.profilePic.pic?.length === 1) {
      return (
        <div className="user-room-profile" style={profileStyles}>
          {profile.settings.profilePic.pic}
        </div>
      )
    } else if(profile.settings.profilePic.length > 1) {
      return (
        <>
          <img className="profileImg" src={profile.settings.profilePic} alt="profile" />
        </>
      )
    } else if(profile.settings.profilePic.length === 1) {
      return (
        <div className="user-room-profile" style={profileStyles}>
          {profile.settings.profilePic}
        </div>
      )
    }
  }

  return (
    <div className="room-profile-cont">
      <div className="profile-cont">
        {profile.settings.profilePic?.pic || profile.settings.profilePic ? renderProfile() : null}
      </div>
      
      <div className="room-desc-cont">
        <div className="room-name">{profile.name ? profile.name : profile.roomName}</div>
        <label>Bio:</label>
        <div className="room-desc">
          {profile.settings.bio ? profile.settings.bio : profile.roomDesc}
        </div>
      </div>

      <button onClick={() => deleteContact()}> Delete Contact</button>
    </div>
  )
} 