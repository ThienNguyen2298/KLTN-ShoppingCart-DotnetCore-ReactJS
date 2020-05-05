using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Helper.user;
using server.Interfaces;
using server.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace server.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly IConfiguration _config;
        private readonly ShopDbContext _context;
        public UserService(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, RoleManager<AppRole> roleManager,
            IConfiguration config, ShopDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _config = config;
            _context = context;
        }
        public async Task<string> Authenticate(LoginRequest request)
        {
            //kiểm trả thằng username có hay chưa
            var user = await _userManager.FindByNameAsync(request.username);
            if (user == null)
            {
                return null;
            }
            var result = await _signInManager.PasswordSignInAsync(user, request.password, true, true);
            if (!result.Succeeded)
            {
                return null;
            }
            var roles = await _userManager.GetRolesAsync(user);
            var claims = new[]
            {
                new Claim("userId", user.Id.ToString()),
                new Claim("fullname", user.displayname),
                new Claim("role", roles[0]),
                new Claim("avatar", user.avatar!=null? user.avatar:"")
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(_config["Tokens:Issuer"],
                _config["Tokens:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(180),
                signingCredentials: creds
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<bool> Register(RegisterRequest request)
        {
            var user = new AppUser()
            {
                displayname = request.displayname,
                Email = request.email,
                UserName = request.email
            };
            var result = await _userManager.CreateAsync(user, request.password);
            if (result.Succeeded)
            {
                var userRole = _context.Roles.FirstOrDefault(x => x.Name == "User");
                await _userManager.AddToRoleAsync(user, userRole.Name);
                return true;
            }
            return false;
        }
    }
}
