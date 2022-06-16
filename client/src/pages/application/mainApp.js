import '../../styles/pages/application/mainApp.css';
import { ProfileSettings } from './profileSettings';
import { CreateRoom } from './createRoom';
import { Room } from './room';
import { RoomProfile } from './roomProfile';
import { RoomNavbar } from './roomNavbar';
import { SettingToggle, CreateRoomToggle, RoomToggle, ProfileToggle } from '../../contexts/contexts';
import React from 'react';

export const MainApp = ({ rooms, setRooms, profiles, setFriendProfiles }) => {
  const { toggleSettings, setToggleSettings } = React.useContext(SettingToggle);
  const { togCreateRoom, setTogCreateRoom } = React.useContext(CreateRoomToggle);
  const { toggleRoom, setToggleRoom } = React.useContext(RoomToggle);
  const { toggleProfile, setToggleProfile } = React.useContext(ProfileToggle);
  let [mobile, setMobile] = React.useState(false);

  const el = document.getElementById('chat-feed');
  if(el) {
    el.scrollTop = el.scrollHeight;
  }

  // Manage all toggles for application
  React.useEffect(() => {
    if(toggleSettings && togCreateRoom) {
      setToggleSettings(false)
    } else if(togCreateRoom) {
      setToggleRoom(false)
      setToggleProfile(false)
    }
  }, [togCreateRoom]);

  React.useEffect(() => {
    if(togCreateRoom && toggleSettings) {
      setTogCreateRoom(false)
    } else if(toggleSettings) {
      setToggleRoom(false)
      setToggleProfile(false)
    }
  }, [toggleSettings]);

  React.useEffect(() => {
    if(toggleRoom) {
      setToggleSettings(false)
      setTogCreateRoom(false)
    }
  }, [toggleRoom]);

  React.useEffect(() => {
    if(toggleProfile) {
      setToggleSettings(false)
      setTogCreateRoom(false)
    }
  }, [toggleProfile])

  React.useEffect(() => {
    if(window.innerWidth <= 878) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [window.innerWidth]);

  return (
    <div className="main-app-container">
      {togCreateRoom ? <CreateRoom rooms={rooms} setRooms={setRooms}/> : null}
      {toggleSettings ? <ProfileSettings /> : null}
      {toggleRoom && toggleProfile === false ? <Room rooms={rooms} /> : null}
      {mobile && !toggleRoom && !toggleSettings && !togCreateRoom ? <RoomNavbar mobile={mobile} setFriendProfiles={setFriendProfiles} rooms={rooms} /> : null}
      {toggleProfile ? <RoomProfile profiles={profiles} rooms={rooms} setRooms={setRooms} /> : null}
      {(togCreateRoom === false === toggleSettings === false) && (toggleRoom === false && toggleProfile === false) ? <h1>Start a conversation...</h1> : null}
    </div>
  )
}