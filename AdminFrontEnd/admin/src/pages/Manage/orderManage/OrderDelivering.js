import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';
import axiosInstance from '../../../utils/axiosInstance';

export default class OrderDelivering extends Component {
    constructor(props){
        super(props);
        this.state = {
            orderDelivering: [],
            orderDetailList: [],
            pageDefault: 1,
            pageSize: 5,
            visible: false,
            isLoading: true,
            totalItem: 0,
            customerItem: '',
        }
    }
    //load api
    callApi = async() => {
        this.setState({
            isLoading: true
        })
        let order = await axiosInstance(`ManageOrder/GetAllOrderNotConfirm`, 'GET')
        .then(res => res.data);
        const formatList = [...order].map((ele) => {
            return {id: ele.id,
                address: ele.address,
                createDate: ele.createDate,
                //email: ele.email,
                customer: !!ele.guess? ele.guess:ele.user.displayname,
                note: ele.note,
                contact: [ele.email, ele.phone],
                //phone: ele.phone,
                deliveryDate: ele.deliveryDate,
                status: ele.status,
                street: ele.street,
                total: ele.total,
                userId: ele.userId,
                key: ele.id
            }
        })
       
        this.setState({
            orderNotConfirm: formatList,
            isLoading: false,
        })
    }
    //
    componentDidMount(){
        this.callApi();
    }
    render() {
        return (
            <>
            <Header></Header>   
                <div className="main_container">
                    <Sidebar isActive="2"></Sidebar>
                    <div className="content">
                        <BreadScrumb title="Đơn hàng đang vận chuyển"></BreadScrumb>
                        Quản lý đơn hàng đang vận chuyển
                    </div>
                </div>
            </>
        )
    }
}