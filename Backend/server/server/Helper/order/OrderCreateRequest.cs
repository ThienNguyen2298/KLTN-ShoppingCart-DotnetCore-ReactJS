using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.order
{
    public class OrderCreateRequest
    {
        
        public int total { get; set; }
        public string note { get; set; }
        public string address { get; set; }
        public string street { get; set; }
        public int feeShip { get; set; }
        //guess
        public string guess { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        
        //foreign key
        public Guid? userId { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
