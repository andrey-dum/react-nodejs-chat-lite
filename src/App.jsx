import React from 'react';

import './App.css';

import socket from './socket';
import JoinBlock from './components/JoinBlock';
import Chat from './components/Chat';

import reducer, { isJoined, setUsers, newMessage } from './reducer';
import axios from 'axios';

const initialState = {
  joined: false,
  roomId: null,
  userName: null,
  users: [],
  messages: []
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const onLogin = async (obj) => {
    dispatch(isJoined(obj));

    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch(setUsers(data.users))

  }

  React.useEffect(() => {

    socket.on('ROOM:JOINED', (users) => {
      console.log('New User', users)
      dispatch(setUsers(users))
    })
    
    socket.on('ROOM:SET_USERS', (users) => {
       dispatch(setUsers(users))
    })

    socket.on('ROOM:NEW_MESSAGE', message => {
       dispatch(newMessage(message))
    })

  }, [])

  console.log(state.messages)

  const addMessage = (message) => {
    dispatch(newMessage(message))
  }

  return (
    <div className="wrapper">
        { state.joined 
          ? <Chat
              roomId={state.roomId}
              users={state.users} 
              messages={state.messages}
              userName={state.userName}
              onAddMessage={addMessage}
            /> 
          : <JoinBlock onLogin={onLogin} />
        }


    </div>
  );
}

export default App;
