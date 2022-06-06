import { React } from '../../client-imports';
import '../../styles/pages/application/message.css';

export const Message = ({ right, left, msg }) => {
  if(right) {
    return (
      <div className="message">
        <p className="right">{msg.text}</p>
      </div>
    )
  } else if(left) {
    return (
      <div className="message">
        <p className="left">{msg.text}</p>
      </div>
    )
  }
  
}