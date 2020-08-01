using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Helper.statistics;
using server.Interfaces;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class StatisticsService : IStatisticsService
    {
        private readonly ShopDbContext _context;
        public StatisticsService(ShopDbContext context)
        {
            _context = context;
        }
        public IQueryable<RevenueStatisticsViewModel> RevenueStatistics(RevenueStatisticsRequest request)
        {
            if (request.option == enums.DayOrMonth.DaysInMonth)
            {
                var rp = from o in _context.orders
                         group o by o.createDate.Date into g
                         where g.Key.Month == request.month && g.Key.Year == request.year
                         select new RevenueStatisticsViewModel
                         {
                             date = g.Key.ToString("dd/MM/yyyy"),
                             countOrder = g.Count(),
                             sumRevenue = g.Sum(x => x.total)
                         };
                return rp;

            }
            else
            {
                var rp = from i in _context.orders
                         where i.createDate.Year == request.year
                         group i by i.createDate.Month into h

                         select new RevenueStatisticsViewModel
                         {
                             date = "Tháng "+ h.Key.ToString(),
                             countOrder = h.Count(),
                             sumRevenue = h.Sum(x => x.total)
                         };
                return rp;
            }
        }
    }
}
