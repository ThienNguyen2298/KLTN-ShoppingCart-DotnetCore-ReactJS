using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Helper.order;
using server.Interfaces;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class ManageOrderService : IManageOrderService
    {
        private readonly ShopDbContext _context;
        public ManageOrderService(ShopDbContext context)
        {
            _context = context;
        }
        public Task<List<OrderViewModel>> GetAllOrderCancelled()
        {
            throw new NotImplementedException();
        }
        //
        public async Task<List<OrderViewModel>> GetAllOrderNotConfirm()
        {
            var list = await _context.orders.Where(x => x.status == enums.OrderStatus.NotConfirm).Include(e => e.OrderDetails)
                .Select(y => new OrderViewModel
                {
                    id = y.id,
                    address = y.address,
                    createDate = y.createDate,
                    deliveryDate = y.deliveryDate,
                    email = y.email,
                    guess = y.guess,
                    note = y.note,
                    feeShip = y.feeShip,
                    OrderDetails = y.OrderDetails,
                    phone = y.phone,
                    status = y.status,
                    street = y.street,
                    total = y.total,
                    user = y.user,
                    userId = y.userId.Value,
                }).ToListAsync();
            return list;
        }
        public async Task<List<OrderDetailViewModel>> GetOrderDetailByOrderId(int orderId)
        {
            var orderDetail = await _context.orderDetails.Where(x => x.orderId == orderId)
                .Select(y => new OrderDetailViewModel
                {
                    id = y.id,
                    order = y.order,
                    orderId = y.orderId,
                    productId = y.productId,
                    //_context.replies.Where(r => r.status == ActionStatus.Display && r.evaluationId == rs.id).ToList(),
                    product = _context.products.Include(i => i.Images).Where(z => z.id == y.productId).ToList(),
                    //product = y.product
                    quantity = y.quantity,
                    sale = y.sale,
                    unitPrice = y.unitPrice
                }).ToListAsync();
            return orderDetail;
            
        }
        public Task<List<OrderViewModel>> GetAllOrderShipping()
        {
            throw new NotImplementedException();
        }

        public Task<List<OrderViewModel>> GetAllOrderSuccess()
        {
            throw new NotImplementedException();
        }

        public async Task<ResultOrderViewModel> confirmShippingAndSendMailBillOrder(StatusOrderRequest request)
        {
            var result = await MoveOrderStatus(request);
            return result;
            
        }
        //Hàm chuyển trạng thái
        private async Task<ResultOrderViewModel> MoveOrderStatus(StatusOrderRequest request)
        {
            var order = await _context.orders.Where(x => x.id == request.orderId).FirstOrDefaultAsync();
            if (order == null)
            {
                return new ResultOrderViewModel { total = 0, customer = string.Empty, email = string.Empty, success = false }; ;
            }
            var total = order.total;
            var customer = string.IsNullOrEmpty(order.guess) ? order.user.displayname : order.guess;
            order.status = request.status;
            _context.Entry(order).State = EntityState.Modified;
            var rs = await _context.SaveChangesAsync() > 0;
            return new ResultOrderViewModel { total = total, customer = customer, email= order.email, success = rs };
        }

        public async Task<bool> CancelOrder(StatusOrderRequest request)
        {
            var result = await MoveOrderStatus(request);
            return result.success;
        }
    }
}
