import * as types from '../actions/action-types/chat-action'

const initialState = {
    receiverId: null,
    openMaximize: false,
    messages: [],
}
const chatReducer = (state = initialState, action) => {
    switch(action.type){
        case types.UPDATE_RECEIVERID: {
            return {
                ...state,
                receiverId: action.payload,
                openMaximize: true,
            }
        }
        case types.UPDATE_OPEN_MAXIMIZE: {
            return {
                ...state,
                openMaximize: action.payload,
                receiverId: null,
            }
        }
        default:
            return {...state}
    }
}
export default chatReducer;