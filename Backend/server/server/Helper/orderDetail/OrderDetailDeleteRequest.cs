using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.orderDetail
{
    public class OrderDetailDeleteRequest
    {
        public int orderDetailId { get; set; }
        public int orderId { get; set; }
    }
}
