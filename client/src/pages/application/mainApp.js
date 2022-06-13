import '../../styles/pages/application/mainApp.css';
import { ProfileSettings } from './profileSettings';
import { CreateRoom } from './createRoom';
import { Room } from './room';
import { RoomProfile } from './roomProfile';
import { SettingToggle, CreateRoomToggle, RoomToggle, ProfileToggle } from '../../contexts/contexts';
import React from 'react';

export const MainApp = ({ rooms, setRooms, profiles }) => {
  const { toggleSettings, setToggleSettings } = React.useContext(SettingToggle);
  const { togCreateRoom, setTogCreateRoom } = React.useContext(CreateRoomToggle);
  const { toggleRoom, setToggleRoom } = React.useContext(RoomToggle);
  const { toggleProfile, setToggleProfile } = React.useContext(ProfileToggle);

  const el = document.getElementById('chat-feed');
  if(el) {
    el.scrollTop = el.scrollHeight;
  }

  // Manage all toggles for application
  React.useEffect(() => {
    if(toggleSettings && togCreateRoom) {
      setToggleSettings(false)
    }
    setToggleRoom(false)
    setToggleProfile(false)
  }, [togCreateRoom]);

  React.useEffect(() => {
    if(togCreateRoom && toggleSettings) {
      setTogCreateRoom(false)
    }
    setToggleRoom(false)
    setToggleProfile(false)
  }, [toggleSettings]);

  React.useEffect(() => {
    setToggleSettings(false)
    setTogCreateRoom(false)
  }, [toggleRoom]);

  React.useEffect(() => {
    setToggleSettings(false)
    setTogCreateRoom(false)
  }, [toggleProfile])

  return (
    <div className="main-app-container">
      {togCreateRoom ? <CreateRoom rooms={rooms} setRooms={setRooms}/> : null}
      {toggleSettings ? <ProfileSettings /> : null}
      {toggleRoom && toggleProfile === false ? <Room rooms={rooms} /> : null}
      {toggleProfile ? <RoomProfile profiles={profiles} rooms={rooms} setRooms={setRooms} /> : null}
      {(togCreateRoom === false === toggleSettings === false) && (toggleRoom === false && toggleProfile === false) ? <h1>Start a conversation...</h1> : null}
    </div>
  )
}