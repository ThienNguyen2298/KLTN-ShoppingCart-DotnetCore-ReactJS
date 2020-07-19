using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Helper.user;
using server.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost("authenticate")]
        [AllowAnonymous]
        
        public async Task<IActionResult> Authenticate([FromBody]LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var resultToken = await _userService.Authenticate(request);
            if(string.IsNullOrEmpty(resultToken)){
                return BadRequest("username hoặc password sai!");
            }
            return Ok(new {token = resultToken });
        }
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody]RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _userService.Register(request);
            if (!result)
            {
                return BadRequest("Email này đã tồn tại!");
            }
            return Ok("Đăng ký tài khoản thành công!");
        }
        [HttpGet("get-user-by-id/{userId}")]
        public async Task<IActionResult> getUserById(Guid userId)
        {
            var user = await _userService.getUserById(userId);
            return Ok(user);
        }
        [HttpPut]
        public async Task<IActionResult> Update([FromForm]UserUpdateRequest request)
        {
            var userId = await _userService.Update(request);
            if (userId == null)
            {
                return BadRequest();

            }
            var user = await _userService.getUserById(userId);
            return Ok(new { message = "Cập nhập user thành công!", user = user });
        }
        
    }
}