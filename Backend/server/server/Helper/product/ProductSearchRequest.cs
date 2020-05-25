using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.product
{
    public class ProductSearchRequest
    {
        public int? categoryId { get; set; }
        public int? providerId { get; set; }
        public string? searchKey { get; set; }
    }
}
