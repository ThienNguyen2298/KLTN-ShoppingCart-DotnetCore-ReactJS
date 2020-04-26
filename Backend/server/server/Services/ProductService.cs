using Microsoft.EntityFrameworkCore;
using server.Data;
using server.enums;
using server.Helper;
using server.Helper.product;
using server.Interfaces;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class ProductService : IProductService
    {
        private readonly ShopDbContext _context;
        public ProductService(ShopDbContext context)
        {
            _context = context;
        }

        public async Task<PagedResult<ProductViewModel>> GetAllByCategoryId(GetProductPagingRequest request)
        {
            // query
            var query = _context.products.AsQueryable();
            //filter
            if (!string.IsNullOrEmpty(request.keyword))
            {
                query = query.Where(x => FormatVietnamese.convertToUnSign(x.name.ToLower())
                .Contains(FormatVietnamese.convertToUnSign(request.keyword.ToLower())));
            }
            if (request.categoryId.HasValue && request.categoryId.Value > 0)
            {
                query = query.Where(x => x.categoryId == request.categoryId.Value);
            }
            //pagination
            int totalRow = await query.CountAsync();
            var data = await query.Include(eva => eva.Evaluations.Where(e => e.status == EvaluationStatus.Confirm))
                .Include(img => img.Images.Where(i => i.status == ActionStatus.Display))
                .OrderBy(x => x.categoryId).Skip((request.pageIndex - 1) * request.pageSize)
                .Take(request.pageSize).Select(rs => new ProductViewModel
                {
                    id = rs.id,
                    name = rs.name,
                    price = rs.price,
                    importPrice = rs.importPrice,
                    sale = rs.sale,
                    categoryId = rs.categoryId,
                    category = rs.category,
                    color = rs.color,
                    size = rs.size,
                    description = rs.description,
                    Evaluations = rs.Evaluations,
                    Images = rs.Images,
                    rating = Convert.ToInt32(rs.Evaluations.Average(ave => ave.rating)),
                    provider = rs.provider,
                    providerId = rs.providerId,
                    status = rs.status

                }).ToListAsync();
            //
            var pagedResult = new PagedResult<ProductViewModel>
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }
    }
}
