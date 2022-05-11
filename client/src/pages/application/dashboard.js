import '../../styles/pages/application/dashboard.css';
import socketIOClient from 'socket.io-client';
import React from 'react';
import { NavbarDashboard } from './navbar';
import { RoomNavbar } from './roomNavbar';
import { ChatRoom } from './chatRoom';

export const Dashboard = ({endpoint}) => {
  let [response, setResponse] = React.useState("");

  // Establish a websocket connection when logged into the dashboard
  React.useEffect(() => {
    const socket = socketIOClient(endpoint);

    socket.on('connect', (err, data) => {
      if(err) return console.error(err);

      console.log(data);
      setResponse(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="dashboard-main-container">
      <div className="dashboard-container">
        Dashboard
        It's {response}
      </div>
    </div>
  )
}