import { React } from '../../client-imports';
import '../../styles/pages/application/message.css';

export const Message = ({ right, left, msg, isChannel }) => {
  const date = new Date(msg.createdAt);

  if(right) {
    return (
      <div className="message">
        <div className="right">
          <p>{msg.text}</p>
          <p className="time">
          <span>{date.getHours() > 13 ? (date.getHours() - 12) + ':' + date.getMinutes() + 'pm'
              : date.getHours() + ':' + date.getMinutes() + 'am'}</span>
          </p>
        </div>
      </div>
    )
  } else if(left) {
    if(isChannel) {
      const profileStyle = {
        backgroundColor: '#' + msg.senderProfile.hex
      }

      return (
        <div className="message">
          <div className="message-cont">
          <div className="user-profile-msg">
            {msg.senderProfile.hex ? (
              <div className="user-profile profile-msg" style={profileStyle}>{msg.senderProfile.picUrl}</div>
            ) : (
              <img className="user-profile profile-msg" src={msg.senderProfile.picUrl} alt="user profile" />
            )}
          </div>
          <div className="left-cont">
            <div className="left">
              <p>{msg.text}</p>
              <p className="time">
                <span>{date.getHours() > 13 ? (date.getHours() - 12) + ':' + date.getMinutes() + 'pm'
                  : date.getHours() + ':' + date.getMinutes() + 'am'}</span>
              </p>
            </div>
          </div>
          </div>
        </div>
      )
    }
  }
  
}