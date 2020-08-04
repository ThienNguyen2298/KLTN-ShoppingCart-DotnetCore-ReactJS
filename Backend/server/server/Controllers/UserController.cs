using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Helper.facebook;
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

        [HttpPost("ForgetPassword")]
        public async Task<IActionResult> ForgetPassword(ForgotPasswordRequest request)
        {
            var check = await _userService.ForgotPassword(request);
            return Ok(check);
        }
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
        {

            var check = await _userService.ResetPassword(request);
            return Ok(check);
        }
        [HttpPost("LoginWithFacebook")]
        public async Task<IActionResult> LoginWithFacebook(FacebookLoginRequest request)
        {
            var token = await _userService.LoginWithFacebook(request);
            if(token == "FAILED")
            {
                return BadRequest("LOGIN FACEBOOK FAILED");
            }
            HttpContext.Response.Headers.Add("Token", $"{token}");
            return Ok(token);
        }
        

    }
}