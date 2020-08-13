using server.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.orderDetail
{
    public class OrderDetailUpdateRequest
    {
        public int id { get; set; }
        public int quantity { get; set; }
        public int unitPrice { get; set; }
        public int sale { get; set; }
        public ActionStatus status { get; set; }
        //foreign key
        public int productId { get; set; }
        //foreign key
        public int orderId { get; set; }
    }
}
