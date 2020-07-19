using server.Helper.order;
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
        Task<List<OrderDetailViewModel>> GetOrderDetailByOrderId(int orderId);
        Task<ResultOrderViewModel> confirmShippingAndSendMailBillOrder(StatusOrderRequest request);
        Task<bool> CancelOrder(StatusOrderRequest request);
        //
        Task<List<OrderViewModel>> GetAllOrderSuccess();
        Task<List<OrderViewModel>> GetAllOrderShipping();
        Task<List<OrderViewModel>> GetAllOrderCancelled();
    }
}
