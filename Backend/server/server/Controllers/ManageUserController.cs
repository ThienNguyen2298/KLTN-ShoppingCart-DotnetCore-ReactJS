using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Helper.user;
using server.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManageUserController : ControllerBase
    {
        private readonly IManageUserService _manageUserService;
        public ManageUserController(IManageUserService manageUserService)
        {
            _manageUserService = manageUserService;
        }
        [HttpGet("GetUserDisplayList")]
        public async Task<IActionResult> GetUserDisplayList()
        {
            var data = await _manageUserService.GetUserDisplayList();
            return Ok(data);
        }
        [HttpPost("DeleteUser")]
        public async Task<IActionResult> DeleteUser(UserChangeStatusRequest request)
        {
            var check = await _manageUserService.ChangeStatusUser(request);
            return Ok(check);
        }
        [HttpPost("DisplayUser")]
        public async Task<IActionResult> DisplayUser(UserChangeStatusRequest request)
        {
            var check = await _manageUserService.ChangeStatusUser(request);
            return Ok(check);
        }
        [HttpPost("SearchUser")]
        public async Task<IActionResult> SearchUser(SearchUserRequest request)
        {
            var data = await _manageUserService.SearchUser(request);
            return Ok(data);
        }
    }
}