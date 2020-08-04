import React, { Component, Fragment } from 'react'
import DisplayEvaluation from '../displayEvaluation/DisplayEvaluation';
import {connect} from 'react-redux';
import {fetch_evaluation} from '../../action/evaluationsAction'
import {Skeleton } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


function formatEvaluationList(arr, userId){
    let temp = arr.map((ele) => {
        return {...ele, isOwn: ele.status === 1 && ele.userId === userId ? true : false}
    })
    return temp.filter(ele => { return ele.status === 0 || ele.isOwn === true})
}
class ListEvaluation extends Component {
    componentDidMount(){
        this.props.fetch_evaluations(this.props.productId);
    }
    render() {
        const {evaluations, userId} = this.props;
        const evaluationFormat = formatEvaluationList(evaluations, userId);
        console.log("format", evaluationFormat);
        let evaluationList = (
            evaluationFormat.length > 0 && evaluationFormat.map(ele => {
                return <DisplayEvaluation key={ele.id} item={ele}></DisplayEvaluation>
            })
        )
        return (
            <div>
                
                <Skeleton loading={this.props.isLoading} indicator={antIcon}>
               <h4>CÁC NHẬN XÉT KHÁC</h4>
               {
                   evaluationList ? evaluationList: <Fragment><p>( Chưa có nhận xét )</p><br></br></Fragment>
               }
               
               </Skeleton>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        isLoading: state.evaluations.isLoading,
        evaluations: state.evaluations.evaluations,
        userId: state.auth.userId,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        fetch_evaluations: (productId) => {dispatch(fetch_evaluation(productId))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListEvaluation);
