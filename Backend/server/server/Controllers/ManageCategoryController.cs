using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Helper.category;
using server.Interfaces;
using server.ViewModel;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class ManageCategoryController : ControllerBase
    {
        private readonly IManageCategoryService _manageCategoryService;
        public ManageCategoryController(IManageCategoryService manageCategoryService)
        {
            _manageCategoryService = manageCategoryService;
        }
        [HttpGet]
        
        public async Task<List<CategoryViewModel>> getAll()
        {
            var data = await _manageCategoryService.GetAll();
            return data;
        }
        [HttpGet("search/{search}")]
        public async Task<List<CategoryViewModel>> search(string search)
        {
            var data = await _manageCategoryService.Search(search);
            return data;
        }
        [HttpGet("getCategoryById")]
        public async Task<IActionResult> getCategoryById(int categoryId)
        {
            var category = await _manageCategoryService.getCategoryById(categoryId);
            return Ok(category);
        }
        [HttpPost]
        public async Task<IActionResult> create(CategoryCreateRequest request)
        {
            var categoryId = await _manageCategoryService.Create(request);
            if (categoryId == 0)
            {
                return BadRequest();
            }
            var category = await _manageCategoryService.getCategoryById(categoryId);
            return CreatedAtAction(nameof(getCategoryById), new { id = categoryId }, category);
        }
        [HttpPut]
        public async Task<IActionResult> update(CategoryUpdateRequest request)
        {
            var result = await _manageCategoryService.Update(request);
            if (result > 0)
            {
                return Ok(new { message = "Cập nhập danh mục thành công!" });
            }
            return BadRequest("Cập nhập danh mục thất bại!");
        }
        [HttpDelete("{categoryId}")]
        public async Task<IActionResult> delete(int categoryId)
        {
            var result = await _manageCategoryService.Delete(categoryId);
            if (result > 0)
            {
                return Ok(new { message = "Xóa danh mục thành công!" });
            }
            return BadRequest("Xóa danh mục thất bại!");
        }
    }
}