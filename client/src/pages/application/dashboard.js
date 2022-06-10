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
  let [messages, setMessages] = React.useState([]);
  const socket = React.useRef();

  // Establish a websocket connection when logged into the dashboard
  React.useEffect(() => {
    socket.current = io(endpoint);
    socket.current.on("connection", data => {
      
    });
  }, [endpoint]);

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

  return (
    <RoomToggle.Provider value={{toggleRoom, setToggleRoom}}>
    <SettingToggle.Provider value={{toggleSettings, setToggleSettings}}>
    <CreateRoomToggle.Provider value={{togCreateRoom, setTogCreateRoom}}>
    <ProfileToggle.Provider value={{toggleProfile, setToggleProfile}}>
    <Messages.Provider value={{messages, setMessages}}>
      <div className="dashboard-main-container">
        <div className="dashboard-container">
          <RoomNavbar setFriendProfiles={setFriendProfiles} rooms={rooms} />
          <div className="main-chat-container">
            <NavbarDashboard profiles={friendProfiles} rooms={rooms} setRooms={setRooms}/>
            <MainApp profiles={friendProfiles} rooms={rooms} setRooms={setRooms}/>
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