using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.product
{
    public class GetProductPagingRequest:PagingRequestBase
    {
        public string keyword { get; set; }
        public int? categoryId { get; set; }
    }
}
