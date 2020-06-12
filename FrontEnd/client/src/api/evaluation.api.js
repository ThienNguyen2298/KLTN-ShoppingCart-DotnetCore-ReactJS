import axiosInstance from '../utils/axiosInstance';

const pathGetEvaluations = "Evaluation/evaluations-by-productId";
const pathCreateEvaluation = "Evaluation";

export const getEvaluationsByProductId = productId => {
    return axiosInstance(`${pathGetEvaluations}/${productId}`, 'GET');
};
export const createEvaluation = evaluation => {
    return axiosInstance(pathCreateEvaluation, 'POST', evaluation)
}
