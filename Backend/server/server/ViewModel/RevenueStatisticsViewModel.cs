using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.ViewModel
{
    public class RevenueStatisticsViewModel
    {
        public string date { get; set; }
        public int countOrder { get; set; }
        public long sumRevenue { get; set; }
    }
}
