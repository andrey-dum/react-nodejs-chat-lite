const JOINED = 'JOINED'
const SET_USERS = 'SET_USERS'
const SET_MESSAGES = 'SET_MESSAGES'

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
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
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