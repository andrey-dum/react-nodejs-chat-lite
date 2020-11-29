import React from 'react';

function Chat({users, messages}) {
  const [messageValue, setMessageValue] = React.useState('');

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
                
                <div className="message">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <div>
                    <span>test user.</span>
                    </div>
              </div>
          </div>
          <form>
            <textarea
              value={messageValue}
              onChange={e => setMessageValue(e.target.value)}
              className="form-control"
              rows="5"></textarea>
            <button type="button" className="btn btn-primary">
              Отправить
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Chat;