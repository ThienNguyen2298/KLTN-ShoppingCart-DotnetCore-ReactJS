using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using server.Data;
using server.Helper.statistics;
using server.Interfaces;
using server.Models;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
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

        public Stream GenerateListProduct(ProductStatisticSearchRequest request, Stream stream = null)
        {
            var listObj = GetListProduct(request);
            List<string> headers = new List<string>()
            {
                "SẢN PHẨM",
                "GIÁ BÁN",
                "GIẢM GIÁ",
                "SỐ LƯỢNG CÒN",
            };
            try
            {
                int addressStartContent = 1;
                using(var excelPackage = new ExcelPackage(stream ?? new MemoryStream()))
                {
                    excelPackage.Workbook.Worksheets.Add("Product List");
                    var worksheet = excelPackage.Workbook.Worksheets[1];
                    //BuilderHeader(worksheet, headers, "PRODUCT LIST");
                    for(int i = 0; i < listObj.Count; i++)
                    {
                        var item = listObj[i];
                        worksheet.Cells[addressStartContent, 1].Value = item.name;
                        worksheet.Cells[addressStartContent, 2].Value = item.price;
                        worksheet.Cells[addressStartContent, 3].Value = item.sale;
                        worksheet.Cells[addressStartContent, 4].Value = item.amount;
                        addressStartContent++;
                    }
                    excelPackage.Save();
                    return excelPackage.Stream;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        private void BuilderHeader(ExcelWorksheet worksheet, List<string> headers, string name)
        {
            var headerRow = new List<string[]>()
            {
                headers.ToArray()
            };
            string headerRange = "A1:" + Char.ConvertFromUtf32(headerRow[0].Length + 64) + "1";
            // Popular header row data
            worksheet.Cells[headerRange].LoadFromArrays(headerRow);
            worksheet.Cells[headerRange].Style.Font.Bold = true;
            worksheet.Cells[headerRange].Style.Font.Size = 14;

        }

        public List<ProductViewModel> GetListProduct(ProductStatisticSearchRequest request)
        {
            var data = _context.products.Where(e => e.status == enums.ActionStatus.Display).AsQueryable();
            var fromAmount = request.fromAmount.HasValue ? request.fromAmount.Value : 0;
            if (request.toAmount.HasValue)
            {
                data = data.Where(x => x.amount >= fromAmount && x.amount <= request.toAmount.Value);
            }
            return data.Select(rs => new ProductViewModel { 
                id = rs.id,
                name = rs.name,
                price = rs.price,
                sale = rs.sale,
                amount = rs.amount,
            }).ToList();
        }

        public List<ProductStatisticViewModel> GetListProductOrder(ProductStatisticSearchRequest request)
        {
            var products = _context.products.Where(e => e.status == enums.ActionStatus.Display).Select(y => new ProductStatisticViewModel
            {
                productId = y.id,
                name = y.name,
                sale = y.sale,
                price = y.price,
                saledAmount = _context.orderDetails.Where(x => x.productId == y.id).Sum(z => z.quantity)
            });
            return products.ToList();
        }
        private async Task<int> TotalProductInOrder(ProductStatisticSearchRequest request, int productId)
        {
            Expression<Func<Order, bool>> expression = x => DateTime.Compare(DateTime.Parse(request.fromDate), x.deliveryDate) <= 0
                && DateTime.Compare(DateTime.Parse(request.toDate), x.deliveryDate) >= 0;
            var total = _context.orderDetails.Where(x => x.productId == productId);
            if(request.toDate != null && request.fromDate != null)
            {
                var order = _context.orders.Where(expression).ToList();
                total = from od in total
                        join o in order on od.orderId equals o.id
                        select od;

            }
            return total.Sum(x => x.quantity);
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
