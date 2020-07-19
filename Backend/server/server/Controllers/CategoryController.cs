using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IManageCategoryService _manageCategoryService;
        public CategoryController(IManageCategoryService manageCategoryService)
        {
            _manageCategoryService = manageCategoryService;
        }
        [HttpGet("getAllCategory")]
        public async Task<IActionResult> getCategory()
        {
            var categories = await _manageCategoryService.GetAll();
            return Ok(categories);
        }
    }
}