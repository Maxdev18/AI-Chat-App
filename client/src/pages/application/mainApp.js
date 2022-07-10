import '../../styles/pages/application/mainApp.css';
import { ProfileSettings } from './profileSettings';
import { CreateRoom } from './createRoom';
import { Room } from './room';
import { RoomProfile } from './roomProfile';
import { RoomNavbar } from './roomNavbar';
import { SettingToggle, CreateRoomToggle, RoomToggle, ProfileToggle, UserContext, Messages } from '../../contexts/contexts';
import { React, Axios } from '../../client-imports';
import alanBtn from '@alan-ai/alan-sdk-web';

export const MainApp = ({ rooms, setRooms, profiles, setFriendProfiles, setSendMessage }) => {
  const { user } = React.useContext(UserContext);
  const { toggleSettings, setToggleSettings } = React.useContext(SettingToggle);
  const { togCreateRoom, setTogCreateRoom } = React.useContext(CreateRoomToggle);
  const { toggleRoom, setToggleRoom } = React.useContext(RoomToggle);
  const { toggleProfile, setToggleProfile } = React.useContext(ProfileToggle);
  const { setMessages } = React.useContext(Messages);
  let [mobile, setMobile] = React.useState(false);

  const el = document.getElementById('chat-feed');
  if(el) {
    el.scrollTop = el.scrollHeight;
  }

  // Mount Alan AI component
  React.useEffect(() => {
    if(user && profiles && rooms) {
      const alanBtnInstance = alanBtn({
        key: `${process.env.REACT_APP_ALAN_KEY}/stage`,
        onCommand: (commandData) => {
          commandController(commandData);
        }
      });

      // Set application state for alan
      alanBtnInstance.setVisualState({rooms, user, profiles});

      let error;
      async function commandController(commandData) {
        const resData = commandData.data;
        const { roomID } = commandData;
        let currentRoomIndex;

        function findRoom() {
          let current;
          for(let i = 0; i < resData.rooms.length; i++) {
            if(resData.rooms[i].roomName) {
              if(commandData.roomID === resData.rooms[i].roomName.toLowerCase()) {
                currentRoomIndex = i;
                current = resData.rooms[i];
              }
            }
          }

          if(current === undefined) {
            for(let i = 0; i < resData.profiles.length; i++) {
              if(roomID === resData.profiles[i].name.toLowerCase()) {
                resData.rooms.map(room => {
                  if(!room.roomId) {
                    let r = room.members.find(m => m !== resData.user._id);
                    if(r) {
                      currentRoomIndex = i;
                      current = room;
                    }
                  }
                })
              }
            }
          }

          if(current === undefined) {
            error = true;
            return undefined;
          } else {
            return current;
          }
        }

        switch (commandData.command) {
          case 'joinRoom': {
            await Axios.post('/api/application/rooms/join-room', { roomID, id: resData.user._id })
            .then(data => {
              if(data.data.privateRoom) {
                setRooms([...rooms, data.data.privateRoom]);
              } else {
                setRooms([...rooms, data.data.channelRoom]);
              }
            })
            .catch(err => {
              error = true;
              console.error(err);
            });
            break;
          }
          case 'deleteRoom': {
            const currentRoom = findRoom();

            if(currentRoom !== undefined) {
              await Axios.post('/api/application/rooms/delete-room', { room: currentRoom, id: resData.user._id })
              .then(() => {
                const newRooms = resData.rooms.filter(room => room._id !== currentRoom._id);
                setToggleProfile(false);
                setToggleRoom(false);
                setRooms(newRooms);
              })
              .catch(err => {
                error = true;
                console.error(err);
              })
            }
            break;
          }
          case 'openRoom': {
            const currentRoom = findRoom();
            
            if(toggleRoom && currentRoom.name === roomID || currentRoom.roomName === roomID) {
              error = true;
              return null;
            } else {
              setMessages({roomId: currentRoom._id, roomIndex: currentRoomIndex, mainRoomIndex: currentRoomIndex});
              setToggleRoom(true);
            }
            break;
          }
          default:
            break;
        }

        if(error) {
          error = false;
          alanBtnInstance.playText('Sorry, something went wrong');
        }
      }
    }
  }, [user, profiles, rooms]);

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
  }, []);

  return (
    <div className="main-app-container">
      {togCreateRoom ? <CreateRoom rooms={rooms} setRooms={setRooms}/> : null}
      {toggleSettings ? <ProfileSettings /> : null}
      {toggleRoom && toggleProfile === false ? <Room rooms={rooms} setSendMessage={setSendMessage} /> : null}
      {mobile && !toggleRoom && !toggleSettings && !togCreateRoom ? <RoomNavbar mobile={mobile} setFriendProfiles={setFriendProfiles} rooms={rooms} /> : null}
      {toggleProfile ? <RoomProfile profiles={profiles} rooms={rooms} setRooms={setRooms} /> : null}
      {(togCreateRoom === false === toggleSettings === false) && (toggleRoom === false && toggleProfile === false) ? <h1>Start a conversation...</h1> : null}
    </div>
  )
}