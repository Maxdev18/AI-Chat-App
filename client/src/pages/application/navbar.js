import '../../styles/pages/application/navbar.css';
import React from 'react';
import { SettingToggle, CreateRoomToggle, Messages, ProfileToggle, UserContext, RoomToggle } from '../../contexts/contexts';
import { Axios, Link } from '../../client-imports';

export const NavbarDashboard = ({ rooms, setRooms, profiles, mobile }) => {
  const { user } = React.useContext(UserContext);
  const { messages } = React.useContext(Messages);
  const { toggleRoom, setToggleRoom } = React.useContext(RoomToggle);
  const { toggleSettings, setToggleSettings } = React.useContext(SettingToggle);
  const { togCreateRoom, setTogCreateRoom } = React.useContext(CreateRoomToggle);
  const { toggleProfile, setToggleProfile } = React.useContext(ProfileToggle);
  let [toggleBurger, setToggleBurger] = React.useState(false);
  let [search, setSearch] = React.useState('');

  function joinRoom() {
    // axios post request to find and join room
    Axios.post('/api/application/rooms/join-room', { id: user._id, search })
      .then(data => {
        // update user state here
        if(data.data.privateRoom) {
          setRooms([...rooms, data.data.privateRoom]);
        } else {
          setRooms([...rooms, data.data.channelRoom]);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  function toggleProfileSettings() {
    setToggleBurger(!toggleBurger);
    setToggleSettings(!toggleSettings);
  }

  function toggleCreateRoom() {
    setToggleBurger(!toggleBurger);
    setTogCreateRoom(!togCreateRoom);
  }

  function toggleRoomProfile() {
    setToggleProfile(!toggleProfile);
  }

  function toggleBurgerMenu() {
    setToggleBurger(!toggleBurger);
  }

  function findFriend(room) {
    for(let i = 0; i < profiles.length; i++) {
      if(room.members[0] === profiles[i]._id) {
        return profiles[i];
      }
      if(room.members[1] === profiles[i]._id) {
        return profiles[i];
      }
    }
  }
  
  function renderNavRoomProfile() {
    for(let i = 0; i < rooms.length; i++) {
      if(rooms[i]._id === messages.roomId) {
        if(rooms[i].settings === undefined) {
          const friend = findFriend(rooms[i]);
          return (
            <div className='room-basics'>
              {friend.settings.profilePic.pic.length > 1 ? (
                <img className="userProfile" alt="profile"src={friend.settings.profilePic.pic} onClick={toggleRoomProfile}/>
              ) : null}
              {friend.settings.profilePic.pic.length === 1 ? (
                <div className="user-profile" style={{backgroundColor: '#' + friend.settings.profilePic.hex}} onClick={toggleRoomProfile}>{friend.settings.profilePic.pic}</div>
              ) : null}

              <div className="room-info">
                {friend.name}
              </div>
            </div> 
          )
        } else {
          const room = rooms[i];
          return (
            <div className="room-basics">
              {room.settings.profilePic.length > 1 ? (
                <img className="userProfile" alt="profile" src={room.settings.profilePic} onClick={toggleRoomProfile}/>
              ) : null}
              {room.settings.profilePic.length === 1 ? (
                <div className="user-profile" style={{backgroundColor: '#' + room.settings.hex}} onClick={toggleRoomProfile}>{room.settings.profilePic}</div>
              ) : null}
              <div className="room-info">
                {room.roomName}
                <span>{room.members.length} Members</span>
              </div>
            </div>
          )
        }
      }
    }
  }

  function goBack() {
    setToggleRoom(false);
    setToggleProfile(false);
    setTogCreateRoom(false);
    setToggleSettings(false);
  }
  
  return (
    <div className="nav-app-container">
      {(mobile && togCreateRoom) || (mobile && toggleSettings) ? (
          <button className="btn-goback" onClick={() => goBack()}>{'<'}</button>
        ) : null}
      {toggleRoom ? (
        <>
        {mobile ? (
          <button className="btn-goback" onClick={() => goBack()}>{'<'}</button>
        ) : null}
        <div className='nav-room-cont'>
          {messages ? renderNavRoomProfile() : null}
        </div>
        </>
      ) : (
        <>
        {(mobile && togCreateRoom) || (mobile && toggleSettings) ? (
          <div className="search-container search-container-toggled">
            <input className="searchRoom" name="searchRoom" placeholder="Find room..." onChange={e => setSearch(e.target.value)}/>
            <button className="btn-searchRoom" onClick={joinRoom}>Join</button>
          </div>
        ) : (
          <div className="search-container">
            <input className="searchRoom" name="searchRoom" placeholder="Find room..." onChange={e => setSearch(e.target.value)}/>
            <button className="btn-searchRoom" onClick={joinRoom}>Join</button>
          </div>
        )}
        
        </>
      )}
      <div className="profile-nav-container">
        <Link className="help-link" to="/learn-ai-commands">?</Link>
        <div className="dropdown">
          <div className="burger" onClick={toggleBurgerMenu}>
            {toggleBurger ? (
              <>
              <span className="active active-1"></span>
              <span className="active active-2"></span>
              <span className="active active-3"></span>
              </>
            ) : (
              <>
              <span className="active"></span>
              <span className="active"></span>
              <span className="active"></span>
              </>
            )}
          </div>
        </div>
      </div>
      {toggleBurger ? (
        <div className="menu-list">
          <h4 onClick={toggleCreateRoom}>Create room</h4>
          <h4 onClick={toggleProfileSettings}>Settings</h4>
        </div>
      ) : null}
    </div>
  )
}