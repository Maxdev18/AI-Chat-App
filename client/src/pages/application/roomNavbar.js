import '../../styles/pages/application/roomNavbar.css';
import { UserContext, RoomToggle, Messages } from '../../contexts/contexts';
import { Axios, React } from '../../client-imports';

export const RoomNavbar = ({rooms, setFriendProfiles, mobile}) => {
  let [ friends, setFriends ] = React.useState([]);
  const { user } = React.useContext(UserContext);
  const { toggleRoom, setToggleRoom } = React.useContext(RoomToggle);
  const { messages, setMessages } = React.useContext(Messages);

  function goToRoom(roomId, roomIndex, mainRoomIndex) {
    if(toggleRoom === true && roomId === messages.roomId) {
      return null;
    } else {
      setToggleRoom(true);
      setMessages({roomId, roomIndex, mainRoomIndex});
    }
  }

  // This useEffect is for fetching room profile data escpecially for private chats
  React.useEffect(() => {
    if(rooms) {
      async function getRoomData() {
        let friendIds = [];
        rooms.map(room => {
          if(!room.roomId) {
            let bool = room.members.find(m => m !== user._id);
            if(bool) return friendIds.push(bool);
            return null;
          }
        });

        await Axios.get('/api/application/rooms/getUsers', { params: friendIds })
          .then(data => {
            setFriends(data.data.userData);
            setFriendProfiles([...data.data.userData]);
          })
          .catch(err => {
            console.error(err);
          })
      }
    getRoomData()
    }
  }, [rooms]);

  function renderFriendProfile(friend) {
    const profileStyles = {
      backgroundColor: '#' + friend?.settings.profilePic.hex
    }
  
    return (
      <div className="friend-profile-container">
        {friend?.settings.profilePic.pic.length === 1 ? (
          <div className="room-profile" style={profileStyles}>{friend?.settings.profilePic.pic}</div>
        ) : (
          <img className="room-profile" src={friend?.settings.profilePic.pic} alt="profile" />
        )}
        <div className="profile-info-container">
          {friend?.name}
        </div>
        {/* <div className="unread-messages-container">3</div> */}
      </div>
    )
  }
  
  function renderRooms(roomsArr) {
    let i = 0;
    return roomsArr?.map((room, index) => {
      let profileStyles;
      if(room.roomId) {
        profileStyles = {
          backgroundColor: "#" + room.settings.hex
        }
      }

      // If roomId exists then renders channel profile, else, then renders friend
      if(room.roomId) {
        return (
          <div className="joined-room-container" key={index} onClick={() => goToRoom(room._id, null, index)}>
            {room.settings.hex ? (
              <div className="room-profile" style={profileStyles}>
                {room.settings.profilePic}
              </div>
            ) : (
              <img src={room.settings.profilePic} alt="profile"></img>
            )}
            <div className="profile-info-container">
              {room.roomName}
            </div>
            {/* <div className="unread-messages-container">3</div> */}
          </div>
        )
      } else if(room.members.length === 2) {
        let ind = i;
        i++;
        return (
          <div className="joined-room-container" key={index} onClick={() => goToRoom(room._id, ind, index)}>
            {friends ? renderFriendProfile(friends[ind]) : null}
          </div>
        )
      }
    })
  }

  return (
    <div className="roomNavbar-container">
      {!mobile ? (
        <div className="logo-container">
          <h1 className="logo-dashboard">
            C<span>AI</span>
          </h1>
        </div>
      ) : null}
      
      <div className="rooms-container">
        {rooms !== 0 ? renderRooms(rooms) : null}
      </div>
    </div>
  )
}