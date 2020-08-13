using server.enums;
using server.Helper.order;
using server.Helper.orderDetail;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IManageOrderService
    {
        //
        Task<List<OrderViewModel>> GetAllOrderNotConfirm();
        Task<List<OrderViewModel>> SearchOrder(SearchOrderRequest request);
        //
        Task<List<OrderDetailViewModel>> GetOrderDetailByOrderId(int orderId);
        Task<UpdateOrderDetailViewModel> UpdateOrderDetail(OrderDetailUpdateRequest request);
        Task<DeleteOrderDetailViewModel> DeleteOrderDetail(int id);
        //
        Task<ResultOrderViewModel> confirmShippingAndSendMailBillOrder(StatusOrderRequest request);
        Task<OrderViewModel> GetOrderByOrderId(int orderId);
        Task<bool> CancelOrder(CancelOrderRequest request);
        Task<bool> confirmSuccessOrder(StatusOrderRequest request);
        //
        Task<List<OrderViewModel>> GetAllOrderSuccess();
        Task<List<OrderViewModel>> GetAllOrderDelivering();
        Task<List<OrderViewModel>> GetAllOrderCancelled();
        Task<bool> SetStatusNotConfirm(int orderId, OrderStatus status);
        Task<bool> UserCancelOrder(int orderId);
    }
}
