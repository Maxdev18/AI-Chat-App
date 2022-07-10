import { React, Axios } from '../../client-imports';
import { Messages, UserContext, ProfileToggle, RoomToggle } from '../../contexts/contexts';
import '../../styles/pages/application/roomProfile.css';

export const RoomProfile = ({ profiles, rooms, setRooms }) => {
  const { setToggleProfile } = React.useContext(ProfileToggle);
  const { setToggleRoom } = React.useContext(RoomToggle);
  const { user } = React.useContext(UserContext);
  const { messages } = React.useContext(Messages);
  const profile = (messages.roomId === rooms[messages.mainRoomIndex]?._id) && rooms[messages.mainRoomIndex]?.roomId ? 
    rooms[messages.mainRoomIndex] : profiles[messages.roomIndex];

  // Remove room if not admin
  async function removeContact() {
    await Axios.post('/api/application/rooms/delete-room', { room: rooms[messages.mainRoomIndex], id: user._id })
      .then(() => {
        const newRooms = rooms.filter(room => room._id !== rooms[messages.mainRoomIndex]._id);
        setToggleProfile(false);
        setToggleRoom(false);
        setRooms(newRooms);
      })
      .catch(err => {
        console.error(err);
      })
  }

  // Delete room if admin
  async function deleteRoom() {
    await Axios.post('/api/application/rooms/delete-room', { room: profile })
      .then(() => {
        const newRooms = rooms.filter(room => room._id !== rooms[messages.mainRoomIndex]._id);
        setToggleProfile(false);
        setToggleRoom(false);
        setRooms(newRooms);
      })
      .catch(err => {
        console.error(err);
      })
  }

  function renderProfile() {
    let profileStyles;
    if(profile.settings.hex) {
      profileStyles = {
        backgroundColor: '#' + profile.settings.hex
      }
    } else if(profile.settings.profilePic) {
      profileStyles = {
        backgroundColor: '#' + profile.settings.profilePic.hex
      }
    }

    if(profile.googleSignIn) {
      return (
        <img src={`${profile.settings.profilePic.pic}`} className="user-profile-setting" alt="profile"></img>
      )
    } else if(profile.settings.profilePic?.pic.length > 1) {
      return (
        <>
          <img className="user-room-profile" src={profile.settings.profilePic.pic} alt="profile" />
        </>
      )
    } else if(profile.settings.profilePic?.pic.length === 1) {
      return (
        <div className="user-room-profile" style={profileStyles}>
          {profile.settings.profilePic.pic}
        </div>
      )
    } else if(profile.settings.profileURL.length > 1) {
      return (
        <>
          <img className="user-room-profile" src={profile.settings.profileURL} alt="profile" />
        </>
      )
    } else if(profile.settings.profileURL.length === 1) {
      return (
        <div className="user-room-profile" style={profileStyles}>
          {profile.settings.profileURL}
        </div>
      )
    }
  }

  return (
    <div className="room-profile-cont">
      <div className="profile-cont">
        {profile.settings.profilePic?.pic || profile.settings.profileURL ? renderProfile() : null}
      </div>
      
      <div className="room-desc-cont">
        <div className="room-name">{profile.name ? profile.name : profile.roomName}</div>
        {profile.roomId ? (
          <div className="room-id">Channel ID: {profile.roomId}</div>
        ) : (
          <div className="room-id">ID: {profile.userAppId}</div>
        )}
        
        <label>Bio:</label>
        <div className="room-desc">
          {profile.settings.bio ? profile.settings.bio : profile.roomDesc}
        </div>
      </div>

      
      {profile.admin === user._id ? (
        <button onClick={() => deleteRoom()}>Delete Room</button>
      ) : (
        <button onClick={() => removeContact()}>Remove Contact</button>
      )}
      
    </div>
  )
} 