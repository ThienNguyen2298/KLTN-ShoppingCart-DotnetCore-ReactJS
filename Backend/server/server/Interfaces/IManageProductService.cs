using Microsoft.AspNetCore.Http;
using server.Helper;
using server.Helper.product;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IManageProductService
    {
        Task<int> UpdatePrice(PriceUpdateRequest request);
        Task<int> Create(ProductCreateRequest product);
        Task<int> Update(ProductUpdateRequest product);
        Task<int> Delete(int productId);
        Task<ProductViewModel> getProductById(int productId);
        Task<List<ProductViewModel>> GetAll();
        //page view model (list , total record)
        Task<PagedResult<ProductViewModel>> GetAllPaging(GetProductPagingRequest request);
        Task<List<ProductViewModel>> searchProduct(ProductSearchRequest request);
        Task<string> SaveFile(IFormFile file);
        

    }
}
