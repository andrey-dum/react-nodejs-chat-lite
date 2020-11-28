import React from 'react';

import './App.css';

import socket from './socket';
import JoinBlock from './components/JoinBlock';
import Chat from './components/Chat';

import reducer, { isJoined } from './reducer';

const initialState = {
  joined: false,
  roomId: null,
  userName: null
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const onLogin = (obj) => {
    dispatch(isJoined(obj));

    socket.emit('ROOM:JOIN', obj);

  }

  React.useEffect(() => {
    socket.on('ROOM:JOINED', (users) => {
      console.log('New User', users)
    })
  }, [])

  console.log(state)

  return (
    <div className="wrapper">
        { state.joined 
          ? <Chat /> 
          : <JoinBlock onLogin={onLogin} />
        }


    </div>
  );
}

export default App;
