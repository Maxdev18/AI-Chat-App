import '../../styles/pages/application/dashboard.css';
import { io } from 'socket.io-client';
import { React, Axios } from '../../client-imports';
import { NavbarDashboard } from './navbar';
import { RoomNavbar } from './roomNavbar';
import { MainApp } from './mainApp';
import { SettingToggle, CreateRoomToggle } from '../../contexts/contexts';
import { UserContext } from '../../contexts/contexts';

export const Dashboard = ({endpoint}) => {
  const { user } = React.useContext(UserContext);
  let [togCreateRoom, setTogCreateRoom] = React.useState(false);
  let [toggleSettings, setToggleSettings] = React.useState(false);
  let [rooms, setRooms] = React.useState([]);
  const socket = React.useRef();

  // Establish a websocket connection when logged into the dashboard
  React.useEffect(() => {
    socket.current = io(endpoint);
    socket.current.on("connection", data => {
      console.log(data);
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
    <SettingToggle.Provider value={{toggleSettings, setToggleSettings}}>
    <CreateRoomToggle.Provider value={{togCreateRoom, setTogCreateRoom}}>
      <div className="dashboard-main-container">
        <div className="dashboard-container">
          <RoomNavbar rooms={rooms} setRooms={setRooms}/>
          <div className="main-chat-container">
            <NavbarDashboard setRooms={setRooms}/>
            <MainApp rooms={rooms} setRooms={setRooms}/>
          </div>
        </div>
      </div>
    </CreateRoomToggle.Provider>
    </SettingToggle.Provider>
  )
}