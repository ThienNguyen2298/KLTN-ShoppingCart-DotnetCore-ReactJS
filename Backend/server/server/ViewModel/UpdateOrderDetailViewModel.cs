using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.ViewModel
{
    public class UpdateOrderDetailViewModel
    {
        public int orderDetailId { get; set; }
        public bool isSuccess { get; set; }
        public int total { get; set; }
    }
}
