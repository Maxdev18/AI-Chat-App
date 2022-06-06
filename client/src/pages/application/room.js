import { React, Axios } from '../../client-imports';
import { Messages, UserContext } from '../../contexts/contexts';
import { Message } from './message';
import '../../styles/pages/application/room.css';

export const Room =() => {
  const { user } = React.useContext(UserContext);
  const { messages, setMessages } = React.useContext(Messages);
  let [text, setText] = React.useState('');
  React.useEffect(() => {
    async function getMessages() {
      const getMessages = await Axios.get(`/api/application/rooms/get-messages`, { params: messages.roomId })
      .then(data => {
        return data.data.messages;
      })
      .catch(err => {
        console.error(err);
      })
      console.log(getMessages)
      setMessages({...messages, messages: [...getMessages]});
      console.log(messages.messages);
    }
    getMessages();
  }, [messages.roomId]);

  async function handleSend() {
    // Future socket connection and save to db
    await Axios.post(`/api/application/rooms/save-message/${messages.roomId}`, { 
      text, 
      sender: user._id, 
      senderName: user.name
    }).catch(err => {
        console.error(err);
      });
    setText('');
  }

  return (
    <div className="room-cont">
      <div className="messages-cont">
        {/* Render Messages */}
        {messages.roomId ? messages.messages?.map((message, index) => {
          const msg = {
            senderName: message.senderName,
            text: message.text,
            createdAt: message.createdAt
          }
          
          if(message.sender === user._id) {
            return (
              <Message 
                right={true}
                key={index}
                msg={msg}
                />
            )
          } else {
            return (
              <Message 
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