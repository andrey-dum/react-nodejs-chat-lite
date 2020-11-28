import React from 'react';
import axios from 'axios';

function JoinBlock({onLogin}) {
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChangeRoomId = (e) => {
    setRoomId(e.target.value)
  }
  const handleChangeUserName = (e) => {
    setUserName(e.target.value)
  }

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Неверные данные!')
    }

    const obj = {
      roomId,
      userName
    }

    setLoading(true);
    await axios.post('/rooms', obj).then(() => {
      onLogin(obj); 
    })
    
  }
  

  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={handleChangeRoomId}
      />
      <input
        type="text"
        placeholder="Ваше имя"
        value={userName}
        onChange={handleChangeUserName}
      />
      <button disabled={loading} onClick={onEnter} className="btn btn-success">
        { loading ? 'ВХОД...' : 'Войти' }
      </button>
    </div>
  );
}

export default JoinBlock;