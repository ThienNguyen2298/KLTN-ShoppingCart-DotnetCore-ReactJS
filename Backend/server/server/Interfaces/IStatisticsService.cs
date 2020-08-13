using server.enums;
using server.Helper.statistics;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IStatisticsService
    {
        IQueryable<RevenueStatisticsViewModel> RevenueStatistics(RevenueStatisticsRequest request);
        IQueryable<ProductViewModel> ProductStatistics(ProductStatisticsRequest request);
        List<StatusOrderStatistics> StatusOrderStatistics();
        List<ProductViewModel> GetListProduct(ProductStatisticSearchRequest request);
        List<ProductStatisticViewModel> GetListProductOrder(ProductStatisticSearchRequest request);
        Stream GenerateListProduct(ProductStatisticSearchRequest request, Stream stream);
    }
}
