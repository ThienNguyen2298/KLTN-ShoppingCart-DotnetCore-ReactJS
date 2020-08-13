using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.statistics
{
    public class ProductStatisticSearchRequest
    {
        public int? fromAmount { get; set; }
        public int? toAmount { get; set; }
        public string fromDate { get; set; }
        public string toDate { get; set; }
        public bool? isIncrease { get; set; }
    }
}
