
const initState = {
    openMaximize: false,
}
const chatReducer = (state = initState, action) => {
    switch(action.type){
        case "OPEN_MAXIMIZE": {
            return {
                openMaximize: action.payload,
            }
        }
        default: 
            return {
                ...state,
            }
    }
}
export default chatReducer;