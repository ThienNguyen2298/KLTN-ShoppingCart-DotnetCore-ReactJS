using server.Helper;
using server.Helper.product;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductViewModel>> Paging(ProductPagingRequest request);
        Task<PagedResult<ProductViewModel>> GetAllByCategoryId(GetProductPagingRequest request);
        Task<List<ProductViewModel>> GetTopViewCountProduct(bool all = false);
        Task<TotalProductViewModel> GetAllProduct(int itemCount = 8);
        Task<ProductViewModel> getProductById(int productId);
        Task<List<ProductViewModel>> SearchProducts(Helper.SearchProductRequest request);
        Task<List<CategoryViewModel>> getListCategoryByGeneralityName(string generalityName);
    }
}
