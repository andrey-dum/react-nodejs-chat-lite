import React from 'react';
import socket from '../socket';
// import { newMessage } from '../reducer';
function Chat({users, messages, userName, roomId, onAddMessage}) {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);


  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      roomId,
      text: messageValue,
      userName
    })
    onAddMessage({
      text: messageValue,
      userName
    })
    setMessageValue('')
  }

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
      <div className="chat">
        <div className="chat-users">
          Комната: <b>1</b>
          <hr />
          <b>Онлайн ({users.length}):</b>
          <ul>
            { users.map((user, index) => <li key={user + index}>{user}</li>) }
          </ul>
        </div>
        <div className="chat-messages">
          <div className="messages">
              {
                messages && messages.map(message => (
                  <div red={messagesRef} className="message">
                    <p>{message.text}</p>
                    <div>
                    <span>{message.userName}</span>
                    </div>
                </div>
                ))
              }
          </div>
          <form>
            <textarea
              value={messageValue}
              onChange={e => setMessageValue(e.target.value)}
              className="form-control"
              rows="5"></textarea>
            <button onClick={onSendMessage} type="button" className="btn btn-primary">
              Отправить
            </button>
          </form>
        </div>
    </div>
  );
}
  
  export default Chat;