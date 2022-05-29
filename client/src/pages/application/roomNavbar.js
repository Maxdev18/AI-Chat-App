import '../../styles/pages/application/roomNavbar.css';
import { UserContext } from '../../contexts/contexts';
import { Axios, React } from '../../client-imports';

export const RoomNavbar = () => {
  const { user, setUser } = React.useContext(UserContext);
  let [ joinedRooms, setJoinedRooms ] = React.useState([]);
  
  React.useEffect(async () => {
    if(user) {
    await Axios.get('/api/application/rooms/get-room', { params: user.joinedRooms })
      .then(res => {
        let rooms = [];
        for(let i = 0; i < Object.keys(res.data.rooms).length; i++) {
          rooms.push(res.data.rooms[i]);
        }
        setJoinedRooms(rooms);
      })
      .catch(err => {
        if(err) console.error(err);
      })
    }
  }, [user]);

  async function goToRoom(roomId) {
    const messages = await Axios.get(`/api/application/get-messages/${roomId}`)
      .then(data => {
        console.log(data.data);
        return data.data;
      })
  }

  // Map through rooms which the current user has joined and render them
  function renderRooms(roomsArr) {
    const profileStyles = {
      backgroundColor: user.settings.profilePic.hex
    }
    
    return roomsArr.map((room, index) => {
      return (
        <div className="joined-room-container" key={index} onClick={() => goToRoom(room.roomId)}>
          {user.googleSignIn ? (
            <img src={user.settings.profilePic.pic} alt="profile image"></img>
          ) : (
            <img src={user.settings.profilePic.pic} style={profileStyles} alt="profile image">{user.settings.profilePic.pic}</img>
          )}
        </div>
      )
    })
  }

  return (
    <div className="roomNavbar-container">
      <div className="logo-container">
        <h1 className="logo-dashboard">
          C<span>AI</span>
        </h1>

        {/* Dynamic component */}
        {/* Has to be implemented later on since rooms are required to render component */}
        {/* {user ? renderRooms(user.joinedRooms) : null} */}
      </div>
    </div>
  )
}