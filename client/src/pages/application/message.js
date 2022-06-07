import { React } from '../../client-imports';
import '../../styles/pages/application/message.css';

export const Message = ({ right, left, msg }) => {
  const date = new Date(msg.createdAt);

  if(right) {
    return (
      <div className="message">
        <div className="right">{msg.text}
          <p>
            <span>{date.getHours() > 13 ? (date.getHours() - 12) + ':' + date.getMinutes() + 'pm'
              : date.getHours() + ':' + date.getMinutes() + 'am'}</span>
          </p>
        </div>
      </div>
    )
  } else if(left) {
    return (
      <div className="message">
        <div className="left">{msg.text}
          <p>
          <span>{date.getHours() > 13 ? (date.getHours() - 12) + ':' + date.getMinutes() + 'pm'
              : date.getHours() + ':' + date.getMinutes() + 'am'}</span>
          </p>
        </div>
      </div>
    )
  }
  
}