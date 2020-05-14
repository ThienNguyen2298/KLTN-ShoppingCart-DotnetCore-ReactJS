using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Helper.provider;
using server.Interfaces;
using server.ViewModel;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class ManageProviderController : ControllerBase
    {
        private readonly IManageProviderService _manageProviderService;
        public ManageProviderController(IManageProviderService manageProviderService)
        {
            _manageProviderService = manageProviderService;
        }
        [HttpGet]
        public async Task<List<ProviderViewModel>> getAll()
        {
            var data = await _manageProviderService.GetAll();
            return data;
        }
        [HttpGet("search/{search}")]
        public async Task<List<ProviderViewModel>> search(string search)
        {
            var data = await _manageProviderService.Search(search);
            return data;
        }
        [HttpGet("getProviderById")]
        public async Task<IActionResult> getProviderById(int providerId)
        {
            var provider = await _manageProviderService.getProviderById(providerId);
            return Ok(provider);
        }
        [HttpPost]
        public async Task<IActionResult> create(ProviderCreateRequest request)
        {
            var providerId = await _manageProviderService.Create(request);
            if (providerId == 0)
            {
                return BadRequest();
            }
            var provider = await _manageProviderService.getProviderById(providerId);
            return CreatedAtAction(nameof(getProviderById), new { id = providerId }, provider);
        }
        [HttpPut]
        public async Task<IActionResult> update(ProviderUpdateRequest request)
        {
            var result = await _manageProviderService.Update(request);
            if (result > 0)
            {
                return Ok(new { message = "Cập nhập nhà cung ứng thành công!" });
            }
            return BadRequest("Cập nhập nhà cung ứng thất bại!");
        }
        [HttpDelete("{providerId}")]
        public async Task<IActionResult> delete(int providerId)
        {
            var result = await _manageProviderService.Delete(providerId);
            if (result > 0)
            {
                return Ok(new { message = "Xóa nhà cung ứng thành công!" });
            }
            return BadRequest("Xóa nhà cung ứng thất bại!");
        }
    }
}