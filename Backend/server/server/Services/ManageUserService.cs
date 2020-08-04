using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Helper.user;
using server.Interfaces;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class ManageUserService : IManageUserService
    {
        private readonly ShopDbContext _context;
        public ManageUserService(ShopDbContext context)
        {
            _context = context;
        }
        public async Task<bool> ChangeStatusUser(UserChangeStatusRequest request)
        {
            var user = await _context.Users.Where(x => x.Id == request.id).FirstOrDefaultAsync();
            user.status = request.status;
            _context.Entry(user).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<UserViewModel>> GetUserDisplayList()
        {
            var data = await _context.Users.Where(x => x.displayname != "Admin").Select(y => new UserViewModel
            {
                id = y.Id,
                address = y.address,
                avatar = y.avatar,
                birthDay = y.birthDay,
                displayname = y.displayname,
                email = y.Email,
                gender = y.gender,
                Orders = y.Orders,
                phone = y.phone,
                status = y.status,
                userType = y.UserName.Contains("facebook") ? "Facebook User":"User"
            }).ToListAsync();
            return data;
        }

        public async Task<List<UserViewModel>> SearchUser(SearchUserRequest request)
        {
            var query = _context.Users.Where(x => x.displayname != "Admin").AsQueryable();
            if (!string.IsNullOrEmpty(request.keyWord))
            {
                query = query.Where(x => x.displayname.ToLower().Contains(request.keyWord.ToLower()));
            }
            if(request.status != null)
            {
                query = query.Where(x => x.status == request.status);
            }
            return await query.Select(y => new UserViewModel
            {
                id = y.Id,
                address = y.address,
                avatar = y.avatar,
                birthDay = y.birthDay,
                displayname = y.displayname,
                email = y.Email,
                gender = y.gender,
                Orders = y.Orders,
                phone = y.phone,
                status = y.status,
                userType = y.UserName.Contains("facebook") ? "Facebook User" : "User"
            }).ToListAsync();
        }
    }
}
