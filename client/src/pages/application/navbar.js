import '../../styles/pages/application/navbar.css';
import React from 'react';
import { SettingToggle, CreateRoomToggle } from '../../contexts/contexts';
import { Axios, Link } from '../../client-imports';
import { UserContext } from '../../contexts/contexts';

export const NavbarDashboard = ({ setRooms }) => {
  const { user } = React.useContext(UserContext);
  const { toggleSettings, setToggleSettings } = React.useContext(SettingToggle);
  const { togCreateRoom, setTogCreateRoom } = React.useContext(CreateRoomToggle);
  let [search, setSearch] = React.useState('');

  // Add join room function
  function joinRoom() {
    // axios post request to find and join room
    Axios.post('/api/application/rooms/join-room', { id: user._id, search })
      .then(data => {
        console.log(data.data);
        // update user state here
        setRooms(data.data.members);
      })
      .catch(err => {
        console.error(err);
      });
  }

  function toggleProfileSettings() {
    setToggleSettings(!toggleSettings);
  }

  function toggleCreateRoom() {
    setTogCreateRoom(!togCreateRoom);
  }

  // Map through rooms which the current user has joined and render them
  const renderProfile = () => {
    const profileStyles = {
      backgroundColor: '#' + user.settings.profilePic.hex
    }

    if(user.googleSignIn) {
      return (
        <img src={user.settings.profilePic.pic} className="user-profile-google" alt="" onClick={toggleProfileSettings}></img>
      )
    } else {
      return (
        <div className="user-profile" style={profileStyles} onClick={toggleProfileSettings}>
          {user.settings.profilePic.pic.length > 1 ? (
            <img className="profileImgNav" src={user.settings.profilePic.pic} alt=""></img>
          ) : (
            <>
              {user.settings.profilePic.pic}
            </>
          )}
        </div>
      )
    }
  }
  // OAQNPCHCN pavel's app id
  return (
    <div className="nav-app-container">
      <div className="search-container">
        <input className="searchRoom" name="searchRoom" placeholder="Find room..." onChange={e => setSearch(e.target.value)}/>
        <button className="btn-searchRoom" onClick={joinRoom}>Join Room</button>
      </div>
      <div className="profile-nav-container">
        <h2 onClick={toggleCreateRoom}>+</h2>
        {user ? renderProfile() : null}
        <Link className="help-link" to="/learn-ai-commands">?</Link>
      </div>
    </div>
  )
}