import '../../styles/pages/application/mainApp.css';
import { ProfileSettings } from './profileSettings';
import { CreateRoom } from './createRoom';
import { SettingToggle, CreateRoomToggle } from '../../contexts/contexts';
import React from 'react';

export const MainApp = () => {
  const { toggleSettings, setToggleSettings } = React.useContext(SettingToggle);
  const { togCreateRoom, setTogCreateRoom } = React.useContext(CreateRoomToggle);

  React.useEffect(() => {
    if(togCreateRoom === true && toggleSettings === true) {
      setToggleSettings(false)
      setTogCreateRoom(false)
    }
  }, [togCreateRoom, toggleSettings]);
  
  return (
    <div className="main-app-container">
      {togCreateRoom ? <CreateRoom /> : null}
      {toggleSettings ? <ProfileSettings /> : null}
      {togCreateRoom && toggleSettings ? <h1>Start a conversation...</h1> : null}
      {togCreateRoom === false && toggleSettings === false ? <h1>Start a conversation...</h1> : null}
    </div>
  )
}