using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.ViewModel
{
    public class ProductStatisticViewModel
    {
        public int productId { get; set; }
        public string name { get; set; }
        public int price { get; set; }
        public int sale { get; set; }
        public int saledAmount { get; set; }
        
    }
}
