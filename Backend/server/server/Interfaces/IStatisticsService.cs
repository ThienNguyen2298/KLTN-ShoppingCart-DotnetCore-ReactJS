using server.enums;
using server.Helper.statistics;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IStatisticsService
    {
        IQueryable<RevenueStatisticsViewModel> RevenueStatistics(RevenueStatisticsRequest request);
    }
}
