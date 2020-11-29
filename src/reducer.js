const JOINED = 'JOINED'
const SET_USERS = 'SET_USERS'
const NEW_MESSAGE = 'NEW_MESSAGE'

export default (state, action) => {
    switch (action.type) {
        case JOINED:
            return {
                ...state,
                joined: true,
                roomId: action.payload.roomId,
                userName: action.payload.userName
            }
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
            
         
    
        default:
            return state;
    }
}


export function isJoined(obj) {
    return {
        type: JOINED,
        payload: obj
      }
}

export function setUsers(users) {
    return {
        type: SET_USERS,
        payload: users
      }
}

export function newMessage(message) {
    return {
        type: NEW_MESSAGE,
        payload: message
      }
}