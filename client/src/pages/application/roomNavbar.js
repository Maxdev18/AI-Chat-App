import '../../styles/pages/application/roomNavbar.css';
import { UserContext, RoomToggle, Messages } from '../../contexts/contexts';
import { Axios, React } from '../../client-imports';

export const RoomNavbar = ({rooms, setRooms}) => {
  let [ friends, setFriends ] = React.useState([]);
  const { user } = React.useContext(UserContext);
  const { toggleRoom, setToggleRoom } = React.useContext(RoomToggle);
  const { messages, setMessages } = React.useContext(Messages);

  async function goToRoom(roomId) {
    setMessages({roomId});
    setToggleRoom(true);
  }

  // This useEffect is for fetching room profile data escpecially for private chats
  React.useEffect(() => {
    if(rooms) {
    async function getRoomData() {
      let friendIds = [];
      rooms.map(room => {
        let bool = room.members.find(m => m !== user._id);
        if(bool) return friendIds = room.members.filter(m => m !== user._id);
        return null;
      });

      await Axios.get('/api/application/rooms/getUsers', { params: friendIds })
        .then(data => {
          setFriends(data.data.userData);
        })
        .catch(err => {
          console.error(err);
        })
    }
    getRoomData()
    }
    
  }, [rooms])

  function renderFriendProfile(membersArr, friendsArr) {
    let friendId = [];
    membersArr.find(member => {
      let bool = friendsArr.find(friend => friend._id === member) != 'undefined';
      if(bool) return friendId = membersArr.filter(m => m !== user._id);
      return null;
    });
    
    if(friendId[0]) {
      return friendsArr.map((friend, index) => {
        const profileStyles = {
          backgroundColor: '#' + friend.settings.profilePic.hex
        }

        return (
          <div className="friend-profile-container" key={index}>
            {friend.settings.profilePic.hex ? (
              <div className="room-profile" style={profileStyles}>{friend.settings.profilePic.pic}</div>
            ) : (
              <img src={friend.settings.profilePic.pic} alt="profile" />
            )}
            <div className="profile-info-container">
              {friend.name}
            </div>
            <div className="unread-messages-container">3</div>
          </div>
        )
      })
    }
  }
  
  function renderRooms(roomsArr) {
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
          <div className="joined-room-container" key={index} onClick={() => goToRoom(room._id)}>
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
            <div className="unread-messages-container">3</div>
          </div>
        )
      } else if(room.members.length === 2) {
        return (
          <div className="joined-room-container" key={index} onClick={() => goToRoom(room._id)}>
            {renderFriendProfile(room.members, friends)}
          </div>
        )
      }
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
      </div>
      <div className="rooms-container">
        {rooms ? renderRooms(rooms) : null}
      </div>
    </div>
  )
}