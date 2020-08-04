using Microsoft.EntityFrameworkCore;
using server.Data;
using server.enums;
using server.Helper.order;
using server.Interfaces;
using server.Models;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class OrderService : IOrderService
    {
        private readonly ShopDbContext _context;
        public OrderService(ShopDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(OrderCreateRequest request)
        {
            var order = new Order()
            {
                address = request.address,
                street = request.street,
                createDate = DateTime.Now,
                guess = request.guess,
                phone = request.phone,
                email = request.email,
                note = request.note,
                feeShip = request.feeShip,
                deliveryDate = request.feeShip == 20000 ? DateTime.Now.AddDays(1) : DateTime.Now.AddDays(3),
                status = enums.OrderStatus.NotConfirm,
                total = request.total,
                userId = request.userId,
                OrderDetails = request.OrderDetails
            };
            _context.orders.Add(order);
            await _context.SaveChangesAsync();
            return order.id;
        }

        public async Task<List<OrderViewModel>> GetOrderListByUserId(Guid userId)
        {
            var data = await _context.orders.Where(x => x.userId == userId && x.status != OrderStatus.Cancel)
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
            return data;
        }
    }
}
