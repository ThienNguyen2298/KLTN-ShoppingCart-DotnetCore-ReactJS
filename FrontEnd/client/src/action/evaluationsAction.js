import {FETCH_LOADING, FETCH_SUCCESS, FETCH_ERROR, CREATE_EVALUATION_ERROR, CREATE_EVALUATION_LOADING, 
    CREATE_EVALUATION_SUCCESS, CREATE_FEEDBACK_ERROR, CREATE_FEEDBACK_SUCCESS, CREATE_FEEDBACK_LOADING} 
from './action-types/evaluations-actions'
import * as evaluationApis from '../api/evaluation.api';
import * as replyApis from '../api/reply.api';

//lấy dữ liệu evaluations
export const fetch_evaluation = (productId) => {
    return dispatch => {
        dispatch(fetch_loading());
        evaluationApis.getEvaluationsByProductId(productId).then(res => {
            dispatch(fetch_success(res.data));
        })
        .catch(err => {
            dispatch(fetch_error(err));
        })
        
    }
}
export const fetch_loading = () => {
    return {
        type: FETCH_LOADING,
    }
}
export const fetch_success = (evaluations) => {
    return {
        type: FETCH_SUCCESS,
        payload: evaluations,
    }
}
export const fetch_error = (err) => {
    return {
        type: FETCH_ERROR,
        payload: err
    }
}
//thêm evaluation
export const handle_create_evaluation = (evaluation) => {
    console.log("eva action: ", evaluation);
    return dispatch => {
        dispatch(create_evaluation_loading());
        evaluationApis.createEvaluation(evaluation)
        .then(res => {
            dispatch(create_evaluation_success(res.data));
        })
        .catch(err => {
            dispatch(create_evaluation_error(err));
        })
    }
}
export const create_evaluation_loading = () => {
    return {
        type: CREATE_EVALUATION_LOADING,
    }
}
export const create_evaluation_success = (evaluation) => {
    return {
        type: CREATE_EVALUATION_SUCCESS,
        payload: evaluation,
    }
}
export const create_evaluation_error = (err) => {
    return {
        type: CREATE_EVALUATION_ERROR,
        payload: err
    }
}
//thêm reply cho evaluation
export const handle_create_feedback = (feedback) => {
    return dispatch => {
        dispatch(create_feedback_loading());
        replyApis.createReply(feedback)
        .then(res => {
            dispatch(create_feedback_success(res.data));
        })
        .catch(err => {
            dispatch(create_feedback_error(err));
        })
    }
}
export const create_feedback_loading = () => {
    return {
        type: CREATE_FEEDBACK_LOADING,
    }
}
export const create_feedback_success = (feedback) => {
    return {
        type: CREATE_FEEDBACK_SUCCESS,
        payload: feedback,
    }
}
export const create_feedback_error = (err) => {
    return {
        type: CREATE_FEEDBACK_ERROR,
        payload: err
    }
}