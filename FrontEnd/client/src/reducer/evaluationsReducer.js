//action
import * as types from '../action/action-types/evaluations-actions';


//
const initState = {
    isLoading: false,
    evaluations: [],
}
const evaluationsReducer = (state = initState, action) => {
    switch(action.type){
        //load
        case types.FETCH_LOADING: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case types.FETCH_SUCCESS: {
            
            return {
                isLoading: false,
                evaluations: action.payload,
            }
        }
        case types.FETCH_ERROR: {
            console.log({...action.payload})
            return {
                ...state,
                isLoading: false,
            }
        }
        //thêm đánh giá.
        case types.CREATE_EVALUATION_LOADING: {
            return{
                ...state,
                isLoading: true,
            }
        }
        case types.CREATE_EVALUATION_SUCCESS: {
            console.log("eva succes:", action.payload);
            let newEvaluations = [...state.evaluations];
            newEvaluations.push({...action.payload});
            return {
                isLoading: false,
                evaluations: newEvaluations,
            }
        }
        case types.CREATE_EVALUATION_ERROR: {
            console.log(action.payload)
            return {
                ...state,
                isLoading: false,
            }
        }
        //thêm phản hồi đánh giá
        case types.CREATE_FEEDBACK_LOADING: {
            return{
                ...state,
                isLoading: true,
            }
        }
        case types.CREATE_FEEDBACK_SUCCESS: {
            let itemEva = [...state.evaluations].filter(ele => {
                if(ele.id === action.payload.evaluationId){
                    ele.replies.push(action.payload);
                }
                return ele;
            });
            
            return {
                evaluations: itemEva,
                isLoading: false,
            }
        }
        case types.CREATE_FEEDBACK_ERROR: {
            return {
                ...state,
                isLoading: false,
            }
        }
        default:
            return state;
    }
}
export default evaluationsReducer;