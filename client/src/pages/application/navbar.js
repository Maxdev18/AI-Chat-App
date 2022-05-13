import '../../styles/pages/application/navbar.css';
import React from 'react';
import { Axios, Link } from '../../client-imports';
import { UserContext } from '../../contexts/contexts';

export const NavbarDashboard = () => {
  const { user, setuser } = React.useContext(UserContext);
  let [search, setSearch] = React.useState('');
  
  // Add join room function
  function joinRoom() {
    // axios post request to find and join room
  }

  function toggleProfileSettings() {

  }

  // Map through rooms which the current user has joined and render them
  const renderProfile = () => {
    const profileStyles = {
      backgroundColor: '#' + user.settings.profilePic.hex
    }

    if(user.googleSignIn) {
      return (
        <img src={user.settings.profilePic.pic} alt="profile image"></img>
      )
    } else {
      return (
        <div className="user-profile" style={profileStyles} onClick={toggleProfileSettings}>
          {user.settings.profilePic.pic}
        </div>
      )
    }
  }
  
  return (
    <div className="nav-app-container">
      <div className="search-container">
        <input className="searchRoom" name="searchRoom" placeholder="Find room..." onChange={e => setSearch(e.value)}/>
        <button className="btn-searchRoom" onClick={joinRoom}>Join Room</button>
      </div>
      <div className="profile-nav-container">
        {user ? renderProfile() : null}
        <Link className="help-link" to="/learn-ai-commands">?</Link>
      </div>
    </div>
  )
}