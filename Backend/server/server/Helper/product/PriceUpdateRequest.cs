using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.product
{
    public class PriceUpdateRequest
    {
        public int id { get; set; }
        public int newPrice { get; set; }
    }
}
