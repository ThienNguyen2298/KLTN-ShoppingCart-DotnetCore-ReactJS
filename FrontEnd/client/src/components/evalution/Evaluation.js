import React, { Component } from 'react';
import { Rate, Input, message, Skeleton } from 'antd';
import './evaluation.css';
import { descriptionRating } from '../../helper/descriptionRating';
import {connect} from 'react-redux';
import {handle_create_evaluation} from '../../action/evaluationsAction';

const { TextArea } = Input;


function formatDisplayStar(number){
    if((number - Math.floor(number)) < 0.5)
    {
        return Math.floor(number)
    }
    else{
        return (Math.floor(number) + 0.5);
    }
}
class Evaluation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEvaluationBtn: false,
            ratingAmount: 1,
            averageRating: 5,
            evaluationCount: 0,
        }
        
    }
    componentDidMount() {
        
        if(this.props.evaluations.length === 0){
            this.setState({
                
                averageRating: 5,
                evaluationCount: 0,
            })
        }
        
        
        
    }
    componentWillUnmount(){
        this.setState({
            isEvaluationBtn: false,
            ratingAmount: 1,
            averageRating: 5,
            evaluationCount: 0,
        })
    }
    componentDidUpdate(){
        
        //trường hợp mà thằng evaluation nó tăng thêm thì cập nhập lại! bằng cách gọi lại api
        if(this.state.evaluationCount !== this.props.evaluations.length){
            if(this.props.evaluations.length === 0){
                this.setState({
                    
                    averageRating: 5,
                    evaluationCount: 0,
                })
            }
            else{
                let total = this.props.evaluations.reduce((sum, ele) => sum += ele.rating, 0);
            
                let average = total/this.props.evaluations.length;
                
                this.setState({
                    
                    averageRating: average.toFixed(1),
                    evaluationCount: this.props.evaluations.length,
                })
            }
        }
    }
    handleClickEvaluationBtn(e) {
        this.setState({
            isEvaluationBtn: !this.state.isEvaluationBtn,
        })
    }
    handleChangeRating(value) {
        this.setState({
            ratingAmount: value,
        })
    }
    handleSubmitEvaluationForm(e) {
        e.preventDefault();
        if (e.target.content.value.trim() === '') {
            message.warning('Vui lòng không để trống nội dung đánh giá!', 2);
        }
        else {
            if(this.props.userId === ''){
                message.warning('Vui lòng đăng nhập tài khoản để đánh giá sản phẩm này!', 3);
                //e.target.content.value = '';
                //e.target.title.value = '';
            }
            else{
                //clear
                let evaluation = {
                    title: e.target.title.value,
                    content: e.target.content.value,
                    rating: this.state.ratingAmount,
                    userId: this.props.userId,
                    productId: parseInt(this.props.productId),
                }
                this.props.create_evaluation(evaluation);
                e.target.content.value = '';
                e.target.title.value = '';
            }
            
            

        }
    }
    render() {
        return (
            <div>
                <h4 >KHÁCH HÀNG NHẬN XÉT</h4>
                <Skeleton loading={this.props.isLoading}>
                <div className="body-display-evaluation">
                    <div style={{ textAlign: 'center' }}>
                        <h5>Đánh Giá Trung Bình</h5>
                        <h2 style={{ color: 'red' }}>{this.state.averageRating ? this.state.averageRating : 5}/5</h2>
                        <Rate allowHalf disabled tooltips={descriptionRating} value={formatDisplayStar(this.state.averageRating)} />
                        <p>( {this.state.evaluationCount} nhận xét )</p>
                    </div>

                    <div className="body-active-rating-btn">
                        <h5>Chia sẻ nhận xét về sản phẩm</h5>
                        <button className="active-rating-btn" onClick={(e) => this.handleClickEvaluationBtn(e)}
                        >
                            {
                                this.state.isEvaluationBtn ? "Đóng" : "Viết nhận xét của bạn"
                            }
                        </button>
                    </div>
                </div>
                <div className={this.state.isEvaluationBtn ? "evaluation-container show-evaluation-container" : "evaluation-container"}>
                    <h3>GỬI NHẬN XÉT CỦA BẠN</h3>
                    <form onSubmit={this.handleSubmitEvaluationForm.bind(this)}>
                        <div style={{ width: '50%' }}>
                            <h5>1. Đánh giá của bạn về sản phẩm này: <Rate tooltips={descriptionRating}
                                onChange={(value) => this.handleChangeRating(value)} value={this.state.ratingAmount}></Rate></h5>
                            <h5>2. Tiêu đề của nhận xét:</h5>
                            <Input name="title" placeholder="Nhập tiêu đề nhận xét (không bắt buộc)"></Input>
                            <h5>3. Viết nhận xét của bạn vào bên dưới:</h5>

                            <TextArea name="content"
                                placeholder="Nhận xét của bạn về sản phẩm này"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                            <button type="submit" className="send-evaluation-btn" >
                                Gửi nhận xét
                            </button>
                        </div>
                    </form>
                </div>
                </Skeleton>
                <br></br>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.evaluations.isLoading,
        userId: state.auth.userId,
        evaluations: state.evaluations.evaluations
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        create_evaluation: (eva) => {dispatch(handle_create_evaluation(eva))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Evaluation);