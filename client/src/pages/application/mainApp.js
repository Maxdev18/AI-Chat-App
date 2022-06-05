import '../../styles/pages/application/mainApp.css';
import { ProfileSettings } from './profileSettings';
import { CreateRoom } from './createRoom';
import { Room } from './room';
import { SettingToggle, CreateRoomToggle, RoomToggle } from '../../contexts/contexts';
import React from 'react';

export const MainApp = ({ rooms, setRooms }) => {
  const { toggleSettings, setToggleSettings } = React.useContext(SettingToggle);
  const { togCreateRoom, setTogCreateRoom } = React.useContext(CreateRoomToggle);
  const { toggleRoom, setToggleRoom } = React.useContext(RoomToggle);

  // Manage all toggles for application
  React.useEffect(() => {
    if(togCreateRoom) {
      setToggleSettings(false)
      setToggleRoom(false)
    }
  }, [togCreateRoom]);

  React.useEffect(() => {
    if(toggleSettings) {
      setTogCreateRoom(false)
      setToggleRoom(false)
    }
  }, [toggleSettings]);

  React.useEffect(() => {
    if(toggleRoom){
      setToggleSettings(false)
      setTogCreateRoom(false)
    }
  }, [toggleRoom]);

  return (
    <div className="main-app-container">
      {togCreateRoom ? <CreateRoom rooms={rooms} setRooms={setRooms}/> : null}
      {toggleSettings ? <ProfileSettings /> : null}
      {toggleRoom ? <Room /> : null}
      {(togCreateRoom === toggleSettings) && toggleRoom === false ? <h1>Start a conversation...</h1> : null}
    </div>
  )
}