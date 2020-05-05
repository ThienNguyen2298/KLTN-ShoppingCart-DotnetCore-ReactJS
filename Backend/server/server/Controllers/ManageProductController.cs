using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Helper;
using server.Helper.product;
using server.Interfaces;
using server.ViewModel;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManageProductController : ControllerBase
    {
        public readonly IManageProductService _manageProductService;
        public ManageProductController(IManageProductService manageProductService)
        {
            _manageProductService = manageProductService;
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<List<ProductViewModel>> getAll()
        
        {
            var data = await _manageProductService.GetAll();
            return data;
        }
        [HttpGet("getProductById")]
        public async Task<IActionResult> getProductById(int productId)
        {
            var product = await _manageProductService.getProductById(productId);
            return Ok(product);
        }
        [HttpPost]
        public async Task<IActionResult> create([FromBody]ProductCreateRequest request)
        {
            var productId = await _manageProductService.Create(request);
            if(productId == 0)
            {
                return BadRequest();
            }
            var product = await _manageProductService.getProductById(productId);
            return CreatedAtAction(nameof(getProductById),new { id = productId}, product);
        }
        [HttpPut]
        public async Task<IActionResult> update([FromBody]ProductUpdateRequest request)
        {
            var result = await _manageProductService.Update(request);
            if(result > 0)
            {
                return Ok(new { message = "Cập nhập sản phẩm thành công!" });
            }
            return BadRequest();
        }
        [HttpDelete]
        public async Task<IActionResult> delete(int productId)
        {
            var result = await _manageProductService.Delete(productId);
            if(result > 0)
            {
                return Ok(new { message = "Xóa sản phẩm thành công!" });
            }
            return BadRequest();
        }
        
    }
}