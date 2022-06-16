import '../../styles/pages/application/dashboard.css';
import { io } from 'socket.io-client';
import { React, Axios } from '../../client-imports';
import { NavbarDashboard } from './navbar';
import { RoomNavbar } from './roomNavbar';
import { MainApp } from './mainApp';
import { SettingToggle, CreateRoomToggle, RoomToggle, Messages, ProfileToggle } from '../../contexts/contexts';
import { UserContext } from '../../contexts/contexts';

export const Dashboard = ({endpoint}) => {
  const { user } = React.useContext(UserContext);
  let [togCreateRoom, setTogCreateRoom] = React.useState(false);
  let [toggleSettings, setToggleSettings] = React.useState(false);
  let [toggleRoom, setToggleRoom] = React.useState(false);
  let [toggleProfile, setToggleProfile] = React.useState(false);
  
  let [rooms, setRooms] = React.useState([]);
  let [friendProfiles, setFriendProfiles] = React.useState([]);
  let [messages, setMessages] = React.useState(null);
  let [prevMessage, setPrevMessage] = React.useState(null);
  const socket = React.useRef();

  let [mobile, setMobile] = React.useState(false);

  // Establish a websocket connection when logged into the dashboard
  React.useEffect(() => {
    socket.current = io(endpoint);
    socket.current.on('getMessage', msg => {
      if((user._id !== msg.sender) && (prevMessage?._id !== msg?._id)) {
        setMessages(prev => ({
          ...prev,
          messages: [
            ...prev.messages,
            msg
          ]
        }))
        setPrevMessage(messages.messages.slice(-1)[0]);
      }
    })
  }, [endpoint]);

  // Establish user socket connection
  React.useEffect(() => {
    if(user) {
      socket.current.emit('addUser', user._id);
    }
  }, [user]);

  // Join a room
  React.useEffect(() => {
    if(toggleRoom && messages.mainRoomIndex !== null) {
      socket.current.emit('leaveRoom', rooms[messages.mainRoomIndex]._id);
      socket.current.emit('joinRoom', rooms[messages.mainRoomIndex]._id);
    }
  }, [toggleRoom, messages?.mainRoomIndex]);

  // Send a message in a room
  React.useEffect(() => {
    if(messages !== null) {
      if(messages.messages) {
        setPrevMessage(messages.messages.slice(-1)[0]);
        socket.current.emit('sendMessage', messages.messages[messages.messages.length - 1]);
      }
    }
  }, [messages?.messages]);

  // Fetch rooms associated with the current user
  React.useEffect(() => {
    async function getRooms() {
      if(user) {
        await Axios.get('/api/application/rooms/get-room', { params: user._id })
          .then(res => {
            let roomsFetched = [];
            for(let i = 0; i < Object.keys(res.data.rooms).length; i++) {
              roomsFetched.push(res.data.rooms[i]);
            }
            setRooms(roomsFetched);
          })
          .catch(err => {
            console.error(err);
          })
      }
    }
    getRooms();
  }, [user]);

  React.useEffect(() => {
    if(window.innerWidth <= 878) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  return (
    <RoomToggle.Provider value={{toggleRoom, setToggleRoom}}>
    <SettingToggle.Provider value={{toggleSettings, setToggleSettings}}>
    <CreateRoomToggle.Provider value={{togCreateRoom, setTogCreateRoom}}>
    <ProfileToggle.Provider value={{toggleProfile, setToggleProfile}}>
    <Messages.Provider value={{messages, setMessages}}>
      <div className="dashboard-main-container">
        <div className="dashboard-container">
          {!mobile ? (
            <RoomNavbar setFriendProfiles={setFriendProfiles} rooms={rooms} />
          ) : null}
          <div className="main-chat-container">
            <NavbarDashboard mobile={mobile} profiles={friendProfiles} rooms={rooms} setRooms={setRooms}/>
            <MainApp setFriendProfiles={setFriendProfiles} profiles={friendProfiles} rooms={rooms} setRooms={setRooms}/>
          </div>
        </div>
      </div>
    </Messages.Provider>
    </ProfileToggle.Provider>
    </CreateRoomToggle.Provider>
    </SettingToggle.Provider>
    </RoomToggle.Provider>
  )
}