using server.Data;
using server.Helper.order;
using server.Interfaces;
using server.Models;
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
                status = enums.OrderStatus.NotConfirm,
                total = request.total,
                userId = request.userId,
                OrderDetails = request.OrderDetails
            };
            _context.orders.Add(order);
            await _context.SaveChangesAsync();
            return order.id;
        }
    }
}
