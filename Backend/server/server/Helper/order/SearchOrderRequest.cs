using server.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.order
{
    public class SearchOrderRequest
    {
        public string keyWord { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        public OrderStatus status { get; set; }
    }
}
