using server.Helper.provider;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IManageProviderService
    {
        Task<int> Create(ProviderCreateRequest request);
        Task<int> Update(ProviderUpdateRequest request);
        Task<int> Delete(int categoryId);
        Task<ProviderViewModel> getProviderById(int categoryId);
        Task<List<ProviderViewModel>> GetAll();
        Task<List<ProviderViewModel>> Search(string search);
    }
}
