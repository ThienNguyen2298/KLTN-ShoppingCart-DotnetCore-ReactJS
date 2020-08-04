using server.Helper.user;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IManageUserService
    {
        Task<List<UserViewModel>> GetUserDisplayList();
        Task<bool> ChangeStatusUser(UserChangeStatusRequest request);
        Task<List<UserViewModel>> SearchUser(SearchUserRequest request);
    }
}
