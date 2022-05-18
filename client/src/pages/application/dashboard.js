import '../../styles/pages/application/dashboard.css';
import socketIOClient from 'socket.io-client';
import React from 'react';
import { NavbarDashboard } from './navbar';
import { RoomNavbar } from './roomNavbar';
import { MainApp } from './mainApp';
import { SettingToggle, CreateRoomToggle } from '../../contexts/contexts';

export const Dashboard = ({endpoint}) => {
  let [response, setResponse] = React.useState("");
  let [togCreateRoom, setTogCreateRoom] = React.useState(false);
  let [toggleSettings, setToggleSettings] = React.useState(false);

  // Establish a websocket connection when logged into the dashboard
  React.useEffect(() => {
    const socket = socketIOClient(endpoint);

    socket.on('connectTo', (data, err) => {
      if(err) return console.error(err);
      setResponse(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <SettingToggle.Provider value={{toggleSettings, setToggleSettings}}>
    <CreateRoomToggle.Provider value={{togCreateRoom, setTogCreateRoom}}>
      <div className="dashboard-main-container">
        <div className="dashboard-container">
          <RoomNavbar />
          <div className="main-chat-container">
            <NavbarDashboard />
            <MainApp />
          </div>
        </div>
      </div>
    </CreateRoomToggle.Provider>
    </SettingToggle.Provider>
  )
}