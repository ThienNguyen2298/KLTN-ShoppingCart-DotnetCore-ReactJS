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
        Task<int> Create(ProductCreateRequest product);
        Task<int> Update(ProductUpdateRequest product);
        Task<int> Delete(int productId);
        Task<List<ProductViewModel>> GetAll();
        //page view model (list , total record)
        Task<PagedResult<ProductViewModel>> GetAllPaging(GetProductPagingRequest request);

    }
}
