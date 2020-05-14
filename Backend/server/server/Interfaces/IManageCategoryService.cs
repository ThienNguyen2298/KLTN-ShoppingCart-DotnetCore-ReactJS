using server.Helper.category;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IManageCategoryService
    {
        Task<int> Create(CategoryCreateRequest request);
        Task<int> Update(CategoryUpdateRequest request);
        Task<int> Delete(int providerId);
        Task<CategoryViewModel> getCategoryById(int providerId);
        Task<List<CategoryViewModel>> GetAll();
        Task<List<CategoryViewModel>> Search(string search);

    }
}
