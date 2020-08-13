using Microsoft.AspNetCore.Http;
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
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace server.Services
{
    public class ManageProductService : IManageProductService
    {
        private readonly ShopDbContext _context;
        private readonly IStorageService _storageService;
        //constructor
        public ManageProductService(ShopDbContext context, IStorageService storageService)
        {
            _context = context;
            _storageService = storageService;
        }
        public async Task<int> Create(ProductCreateRequest request)
        {
            var tempImages = new List<Image>();
            foreach(IFormFile f in request.images)
            {
                var url = await this.SaveFile(f);
                var img = new Image() { urlImage = url };
                tempImages.Add(img);
            }
            var product = new Product()
            {
                name = request.name,
                description = request.description,
                color = request.color,
                size = request.size,
                sale = request.sale,
                status = enums.ActionStatus.Display,
                rating = 5,
                amount = request.amount,
                importPrice = request.importPrice,
                price = request.price,
                Images = tempImages,
                categoryId = request.categoryId,
                providerId = request.providerId
            };
            
            _context.products.Add(product);
            await _context.SaveChangesAsync();
            return product.id;
        }
        public async Task<int> Update(ProductUpdateRequest request)
        {
            
            
            //
            if(request.images != null)
            {
                var findProduct = await _context.products.Include(img => img.Images).Select(se => new
                {
                    id = se.id,
                    Images = se.Images.Where(e => e.status == ActionStatus.Display).ToList()
                }
                ).FirstOrDefaultAsync(p => p.id == request.id);
                foreach (var image in findProduct.Images)
                {
                    if (request.images.Contains(image.id) == false)
                    {
                        image.status = ActionStatus.Deleted;
                        _context.Entry(image).State = EntityState.Modified;
                        
                    }
                }
                if(request.files != null)
                {
                    var tempImages = new List<Image>();
                    foreach (IFormFile f in request.files)
                    {
                        var url = await this.SaveFile(f);
                        var img = new Image() { urlImage = url, productId = request.id };
                        tempImages.Add(img);
                    }
                    _context.images.AddRange(tempImages);
                }
            }
            else
            {
                var findProduct = await _context.products.Include(img => img.Images).Select(se => new
                {
                    id = se.id,
                    Images = se.Images.Where(e => e.status == ActionStatus.Display).ToList()
                }
                ).FirstOrDefaultAsync(p => p.id == request.id);
                foreach (var image in findProduct.Images)
                {
                    
                     image.status = ActionStatus.Deleted;
                     _context.Entry(image).State = EntityState.Modified;
                     
                    
                }
                if (request.files != null)
                {
                    var tempImages = new List<Image>();
                    foreach (IFormFile f in request.files)
                    {
                        var url = await this.SaveFile(f);
                        var img = new Image() { urlImage = url, productId = request.id };
                        tempImages.Add(img);
                    }
                    _context.images.AddRange(tempImages);
                }
            }
            
            

            //
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
                amount= request.amount,
                viewCount = request.viewCount,
                Images = null,
                status = request.status,
                categoryId = request.categoryId,
                providerId = request.providerId
            };
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return product.id;

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
            var data = _context.products.Include(img => img.Images).Where(x => x.status == ActionStatus.Display)
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
                    amount = rs.amount,
                    viewCount = rs.viewCount,
                    description = rs.description,
                    
                    Images = rs.Images.Where(p => p.status == ActionStatus.Display).ToList(),
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
                    status = ele.status,
                    amount = ele.amount,
                    viewCount = ele.viewCount,
                })
                .FirstOrDefaultAsync(x => x.id == productId);
            
            var temp = product;
            return temp;
        }

        public async Task<string> SaveFile(IFormFile file)
        {
            var originalFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
            await _storageService.SaveFileAsync(file.OpenReadStream(), fileName);
            return $"https://localhost:5001/MyImages/{fileName}";
        }

        public async Task<List<ProductViewModel>> searchProduct(ProductSearchRequest request)
        {
            var data = _context.products.AsQueryable();
            if(request.categoryId.Value != 0)
            {
                data = data.Where(ele => ele.categoryId == request.categoryId);
            }
            if(request.providerId.Value != 0)
            {
                data = data.Where(ele => ele.providerId == request.providerId);
            }
            if (!string.IsNullOrEmpty(request.searchKey.Trim()))
            {
                data = data.Where(ele => ele.name.ToLower()
               .Contains(request.searchKey.ToLower())
               );
            }
            

            return await data.Where(i => i.status == ActionStatus.Display).Select(rs => new ProductViewModel
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
                
                Images = rs.Images.Where(p => p.status == ActionStatus.Display).ToList(),
                rating = Convert.ToInt32(rs.Evaluations.Average(ave => ave.rating)),
                provider = rs.provider,
                providerId = rs.providerId,
                status = rs.status

            }).ToListAsync();
        }

        public async Task<int> UpdatePrice(PriceUpdateRequest request)
        {
            var product = await _context.products.Where(x => x.id == request.id).FirstOrDefaultAsync();
            product.price = request.newPrice;
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return product.id;
        }
    }
}
