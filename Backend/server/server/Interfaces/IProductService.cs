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
        Task<PagedResult<ProductViewModel>> GetAllByCategoryId(GetProductPagingRequest request);
        Task<List<ProductViewModel>> GetTopViewCountProduct(bool all = false);
        Task<List<ProductViewModel>> GetAllProduct(int itemCount = 8);
        Task<ProductViewModel> getProductById(int productId);
    }
}
