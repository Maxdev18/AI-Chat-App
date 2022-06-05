import { React, Axios } from '../../client-imports';
import { Messages } from '../../contexts/contexts';
import '../../styles/pages/application/room.css';

export const Room =() => {
  const { messages, setMessages } = React.useContext(Messages);
  React.useEffect(() => {
    async function getMessages() {
      const getMessages = await Axios.get(`/api/application/get-messages/${messages.roomId}`)
      .then(data => {
        console.log(data.data);
        return data.data;
      })
      .catch(err => {
        console.error(err);
      })
      setMessages({...messages, messages: [getMessages]})
    }
    getMessages();
  }, [messages.roomId]);

  return (
    <div>
      You have joined this room
    </div>
  )
}