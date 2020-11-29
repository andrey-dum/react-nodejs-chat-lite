import React from 'react';

import './App.css';

import socket from './socket';
import JoinBlock from './components/JoinBlock';
import Chat from './components/Chat';

import reducer, { isJoined, setUsers } from './reducer';
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

  }, [])

  console.log(state)

  return (
    <div className="wrapper">
        { state.joined 
          ? <Chat users={state.users} messgae={state.messages} /> 
          : <JoinBlock onLogin={onLogin} />
        }


    </div>
  );
}

export default App;
