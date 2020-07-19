using server.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.order
{
    public class StatusOrderRequest
    {
        public int orderId { get; set; }
        public OrderStatus status { get; set; }
    }
}
