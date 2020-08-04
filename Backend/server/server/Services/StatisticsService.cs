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

        public IQueryable<ProductViewModel> ProductStatistics(ProductStatisticsRequest request)
        {
            if(request.status == enums.HotStatus.Empty)
            {
                var query = (from p in _context.products
                             where p.amount < 20 && p.status == enums.ActionStatus.Display
                             orderby p.amount descending
                             select new ProductViewModel
                             {
                                 name = p.name,
                                 Images = p.Images,
                                 amount = p.amount,
                             });
                query = query.Count() > 20 ? query.Take(20) : query;
                return query;
            }
            else
            {
                var query = (from p in _context.products
                             where p.amount >= 100 && p.status == enums.ActionStatus.Display
                             orderby p.amount ascending
                             select new ProductViewModel
                             {
                                 name = p.name,
                                 Images = p.Images,
                                 amount = p.amount,
                             });
                query = query.Count() > 20 ? query.Take(20) : query;
                return query;
            }
            
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

        public List<StatusOrderStatistics> StatusOrderStatistics()
        {
            var querySuccess = _context.orders.Where(a => a.status == enums.OrderStatus.Success).Count();
            var queryShipping = _context.orders.Where(a => a.status == enums.OrderStatus.Shipping).Count();
            var queryNotConfirm = _context.orders.Where(a => a.status == enums.OrderStatus.NotConfirm).Count();
            var queryCancel = _context.orders.Where(a => a.status == enums.OrderStatus.Cancel).Count();
            return new List<StatusOrderStatistics>() { 
                new StatusOrderStatistics(){ status = "Thành công", count = querySuccess},
                new StatusOrderStatistics(){ status = "Đang vận chuyển", count = queryShipping},
                new StatusOrderStatistics(){ status = "Chưa duyệt", count = queryNotConfirm},
                new StatusOrderStatistics(){ status = "Đã hủy", count = queryCancel}
            };
        }
    }
}
