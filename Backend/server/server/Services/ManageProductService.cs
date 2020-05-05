using Microsoft.EntityFrameworkCore;
using server.Data;
using server.enums;
using server.Exceptions;
using server.Helper;
using server.Helper.product;

using server.Interfaces;
using server.Models;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class ManageProductService : IManageProductService
    {
        private readonly ShopDbContext _context;
        //constructor
        public ManageProductService(ShopDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(ProductCreateRequest request)
        {
            var product = new Product()
            {
                name = request.name,
                description = request.description,
                color = request.color,
                size = request.size,
                sale = request.sale,
                status = enums.ActionStatus.Display,
                rating = 5,
                importPrice = request.importPrice,
                price = request.price,
                Images = request.Images,
                categoryId = request.categoryId,
                providerId = request.providerId
            };
            _context.products.Add(product);
            await _context.SaveChangesAsync();
            return product.id;
        }
        public async Task<int> Update(ProductUpdateRequest request)
        {
            var product = new Product()
            {
                id = request.id,
                name = request.name,
                color = request.color,
                size = request.size,
                description = request.description,
                price = request.price,
                importPrice = request.importPrice,
                rating = request.rating,
                sale = request.sale,
                status = request.status,
                categoryId = request.categoryId,
                providerId = request.providerId
            };
            
            _context.Entry(product).State = EntityState.Modified;
            return await _context.SaveChangesAsync();

        }
        public async Task<int> Delete(int productId)
        {
            var product = await _context.products.FindAsync(productId);
            if(product == null)
            {
                throw new ShopException($"Cannot find any product to this product id {productId}!");
            }
            //đổi cờ ko xóa
            product.status = ActionStatus.Deleted;
            _context.Entry(product).State = EntityState.Modified;
            return await _context.SaveChangesAsync();
        }

        public async Task<List<ProductViewModel>> GetAll()
        {
            var data = _context.products.Include(ev => ev.Evaluations).Include(img => img.Images)
                .Select(rs => new ProductViewModel
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

                });
            return await data.ToListAsync();
        }

        

        public async Task<PagedResult<ProductViewModel>> GetAllPaging(GetProductPagingRequest request)
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
                .Take(request.pageSize).Select(rs => new ProductViewModel {
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

        public async Task<ProductViewModel> getProductById(int productId)
        {
            var product = await _context.products.Include(eva => eva.Evaluations)
                .Include(img => img.Images)
                .Select(ele => new ProductViewModel() {
                    id = ele.id,
                    name = ele.name,
                    category = ele.category,
                    categoryId = ele.categoryId,
                    color = ele.color,
                    description = ele.description,
                    Evaluations = ele.Evaluations.Where(e => e.status == EvaluationStatus.Confirm).ToList(),
                    Images = ele.Images.Where(i => i.status == ActionStatus.Display).ToList(),
                    importPrice = ele.importPrice,
                    price = ele.price,
                    provider = ele.provider,
                    providerId = ele.providerId,
                    rating = ele.rating,
                    sale = ele.sale,
                    size = ele.size,
                    status = ele.status
                })
                .FirstOrDefaultAsync(x => x.id == productId);
            var temp = product;
            return temp;
        }
    }
}
