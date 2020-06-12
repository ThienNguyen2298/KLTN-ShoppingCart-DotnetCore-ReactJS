using server.Helper.user;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IUserService
    {
        Task<string> Authenticate(LoginRequest request);
        Task<bool> Register(RegisterRequest request);
        Task<UserViewModel> getUserById(Guid userId);
        Task<Guid> Update(UserUpdateRequest request);
    }
}
