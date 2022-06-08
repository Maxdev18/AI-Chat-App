import { React, Axios } from '../../client-imports';
import { Messages, UserContext } from '../../contexts/contexts';
import { Message } from './message';
import '../../styles/pages/application/room.css';

export const Room =({ rooms }) => {
  const { user } = React.useContext(UserContext);
  const { messages, setMessages } = React.useContext(Messages);
  let [text, setText] = React.useState('');

  // Get room object for current room
  let isChannel;
  function checkIsChannel() {
    for(let i = 0; i < rooms.length; i++) {
      if(rooms[i]._id === messages.roomId) {
        if(rooms[i].roomId) {
          return isChannel = true;
        }
        isChannel = false;
      }
    }
  }
  checkIsChannel();

  React.useEffect(() => {
    async function getMessages() {
      const getMessages = await Axios.get(`/api/application/messages/get-messages`, { params: messages.roomId })
      .then(data => {
        return data.data.messages;
      })
      .catch(err => {
        console.error(err);
      })
      
      if(getMessages[0] !== null) {
        setMessages({...messages, messages: [...getMessages]});
      }
    }
    getMessages();
  }, [messages.roomId]);

  React.useEffect(() => {
    // Select the messages container and allow auto scroll on new message
    const el = document.querySelector('.messages-cont');
    if(el) el.scrollTop = el.scrollHeight;
  }, [messages.messages?.length])

  async function handleSend() {
    // Future socket connection and save to db
    await Axios.post(`/api/application/messages/create-message/${messages.roomId}`, { 
      text, 
      sender: user._id, 
      senderName: user.name,
      senderProfile: {
        picUrl: user.settings.profilePic.pic,
        hex: user.settings.profilePic.hex
      }
    }).then(data => {
      try {
        setMessages(prev => ({
          ...prev,
          messages: [
            ...prev.messages,
            data.data.message
          ]
        }))
      } catch {
        setMessages({messages: [data.data.message]})
      }
      
    }).catch(err => {
        console.error(err);
      });
    setText('');
  }

  return (
    <div className="room-cont">
      <div className="messages-cont">
        {/* Render Messages */}
        {messages.roomId && messages.messages ? messages.messages?.map((message, index) => {
          const msg = {
            senderName: message.senderName,
            senderProfile: message.senderProfile,
            text: message.text,
            createdAt: message.createdAt
          }

          if(message.sender === user._id) {
            return (
              <Message 
                isChannel={isChannel}
                right={true}
                key={index}
                msg={msg}
                />
            )
          } else {
            return (
              <Message 
                isChannel={isChannel}
                left={true}
                key={index}
                msg={msg}/>
            )
          }
          
        }) : null}
      </div>
      <div className="send-cont">
        <input type="text" placeholder="Message..." value={text} onChange={e => setText(e.target.value)}/>
        <button onClick={handleSend}>send</button>
      </div>
    </div>
  )
}