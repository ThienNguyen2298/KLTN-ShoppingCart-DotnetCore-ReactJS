using server.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.order
{
    public class CancelOrderRequest
    {
        public int orderId { get; set; }
        public OrderStatus status { get; set; }
        public OrderStatus statusRollBack { get; set; }
        public string note { get; set; }
    }
}
