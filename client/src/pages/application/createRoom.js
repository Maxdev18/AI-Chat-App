// Author Credit for image icon
// https://pngtree.com/element/down?id=NDAxNzUwMw==&type=1&time=1653677310&token=OTc0OThhODMxNzE1ZDliYzQ3YzNkZGFhZGEwZmEwNTI=
import { React, Axios } from '../../client-imports';
import { UserContext, CreateRoomToggle } from '../../contexts/contexts';
import ProfilePlaceholder from '../../staticFiles/camera-icon.png';
import '../../styles/pages/application/createRoom.css';

export const CreateRoom = ({rooms, setRooms}) => {
  const { user } = React.useContext(UserContext);
  const { setTogCreateRoom } = React.useContext(CreateRoomToggle);
  let [ roomName, setRoomName ] = React.useState('');
  let [ roomDescription, setRoomDescription ] = React.useState('');
  let [ image, setImage ] = React.useState(null);
  let [ profileUrl, setProfileUrl ] = React.useState('');

  function updateRoomProfile(e) {
    const file = e.target.files[0];
    setFile(file);
    const objectUrl = URL.createObjectURL(file);
    setProfileUrl(objectUrl);
  }

  function setFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    }
  }

  function createRoom() {
    let formData = {
      "file": image,
      "roomName": roomName,
      "roomDesc": roomDescription,
      "admin": user._id,
      "adminName": user.name
    }

    Axios.post("/api/application/rooms/create-room", formData)
      .then(data => {
        setRooms([...rooms, data.data.savedRoom]);
        setTogCreateRoom(false);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const uploadProfile = () => {
      return (
        <label htmlFor="inputTag" className="user-profile-setting room-profile" onChange={updateRoomProfile}>
          {profileUrl ? (
            <img src={profileUrl} className="upload-room-profile" alt="upload a pic for the room"></img>
          ) : (
            <img src={ProfilePlaceholder} className="upload-room-profile" alt="upload a pic for the room"></img>
          )}
          
          <input id="inputTag" type="file" accept="image/png, image/jpg, image/gif, image/jpeg"/>
        </label>
      )
  }

  return (
    <div className="create-room-container">
      <div className="profile-cont">
        {uploadProfile()}
        <div className="input-profile-container">
          <span>Room Name</span>
          <input className="inp-roomName" placeholder="Room name..." maxLength="60" value={roomName} onChange={e => setRoomName(e.target.value)} />
        </div>
      </div>
      <div className="profile-desc">
	<span>Description</span>
	<textarea className="desc" placeholder="Description..." maxLength="300" onChange={e => setRoomDescription(e.target.value)} />
      </div> 
      <button onClick={createRoom} className="btn-create">Create</button>
    </div>
  )
}