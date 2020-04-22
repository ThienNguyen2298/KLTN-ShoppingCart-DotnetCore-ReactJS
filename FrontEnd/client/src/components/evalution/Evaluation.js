import React, { Component } from 'react';
import {Rate, Input} from 'antd';
import './evaluation.css';
import {descriptionRating} from '../../helper/descriptionRating'

const { TextArea } = Input;


const value = 5;
export default class Evaluation extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEvaluationBtn: false,
            ratingAmount: 0
        }
        this.evaluationRef = React.createRef();
    }
    handleClickEvaluationBtn(e){
        this.setState({
            isEvaluationBtn: !this.state.isEvaluationBtn,
        })
        //scroll focus Evaluation
        if(this.evaluationRef.current.getBoundingClientRect().y > 530 && this.state.isEvaluationBtn === false){
            window.scrollTo(this.evaluationRef.current.getBoundingClientRect().x, 
            this.evaluationRef.current.getBoundingClientRect().y - 100)
        }
        
    }
    handleChangeRating(value){
        this.setState({
            ratingAmount: value,
        })
    }
    render() {
        return (
            <div>
                <h4 ref={this.evaluationRef}>KHÁCH HÀNG NHẬN XÉT</h4>
                <div className="body-display-evaluation">
                    <div style={{textAlign: 'center'}}>
                        <h5>Đánh Giá Trung Bình</h5>
                        <h2 style={{color: 'red'}}>{value}/5</h2>
                        <Rate disabled tooltips={descriptionRating} value={value} />
                        <p>( 121 nhận xét )</p>
                    </div>
                    
                    <div className="body-active-rating-btn">
                        <h5>Chia sẻ nhận xét về sản phẩm</h5>
                        <button className="active-rating-btn" onClick={(e)=> this.handleClickEvaluationBtn(e)}
                        >
                            {
                                this.state.isEvaluationBtn ? "Đóng":"Viết nhận xét của bạn"
                            }
                        </button>
                    </div>
                </div>
                <div className={this.state.isEvaluationBtn ? "evaluation-container show-evaluation-container":"evaluation-container"}>
                        <h3>GỬI NHẬN XÉT CỦA BẠN</h3>
                        <div style={{width: '50%'}}>
                            <h5>1. Đánh giá của bạn về sản phẩm này: <Rate tooltips={descriptionRating} 
                            onChange={(value) => this.handleChangeRating(value)} value={this.state.ratingAmount}></Rate></h5>
                            <h5>2. Tiêu đề của nhận xét:</h5>
                            <Input placeholder="Nhập tiêu đề nhận xét (không bắt buộc)"></Input>
                            <h5>3. Viết nhận xét của bạn vào bên dưới:</h5>
                            
                            <TextArea
                            placeholder="Nhận xét của bạn về sản phẩm này"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                            <button className="send-evaluation-btn" >
                                Gửi nhận xét
                            </button>
                        </div>
                </div>
            </div>
        )
    }
}
