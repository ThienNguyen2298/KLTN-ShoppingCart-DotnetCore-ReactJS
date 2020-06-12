import React, { Component } from 'react'
import DisplayEvaluation from '../displayEvaluation/DisplayEvaluation';
import {connect} from 'react-redux';
import {fetch_evaluation} from '../../action/evaluationsAction'
import {Skeleton } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class ListEvaluation extends Component {
    componentDidMount(){
        this.props.fetch_evaluations(this.props.productId);
    }
    render() {
        
        let evaluations = (
            this.props.evaluations.length > 0 && this.props.evaluations.map(ele => {
                return <DisplayEvaluation key={ele.id} item={ele}></DisplayEvaluation>
            })
        )
        return (
            <div>
                
                <Skeleton loading={this.props.isLoading} indicator={antIcon}>
               <h4>CÁC NHẬN XÉT KHÁC</h4>
               {
                   evaluations ? evaluations: <p>( Chưa có nhận xét )</p>
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
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        fetch_evaluations: (productId) => {dispatch(fetch_evaluation(productId))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListEvaluation);
