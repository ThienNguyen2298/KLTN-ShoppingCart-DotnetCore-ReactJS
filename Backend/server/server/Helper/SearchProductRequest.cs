using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper
{
    public class SearchProductRequest
    {
        [FromQuery]
        public string searchKey { get; set; }
        [FromQuery]
        public int? categoryId { get; set; }
        [FromQuery] 
        public int? rating { get; set; }
        [FromQuery] 
        public int? providerId { get; set; }
        [FromQuery] 
        public int? fromPrice { get; set; }
        [FromQuery] 
        public int? toPrice { get; set; }
        [FromQuery]
        public int? currentPage { get; set; }
        [FromQuery]
        public int? pageSize { get; set; }

    }
}
