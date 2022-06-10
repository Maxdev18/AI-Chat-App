import { React } from '../../client-imports';
import { Messages } from '../../contexts/contexts';

export const RoomProfile = ({ profiles, rooms }) => {
  const { messages, setMessages } = React.useContext(Messages);

  React.useEffect(() => {
    console.log(profiles);
  }, [profiles])
  return (
    <div className="room-profile">
      Room Profile
    </div>
  )
}