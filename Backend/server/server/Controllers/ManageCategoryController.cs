using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.ViewModel;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManageCategoryController : ControllerBase
    {
        private readonly IManageCategoryService _manageCategoryService;
        public ManageCategoryController(IManageCategoryService manageCategoryService)
        {
            _manageCategoryService = manageCategoryService;
        }
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<List<CategoryViewModel>> getAll()
        {
            var data = await _manageCategoryService.GetAll();
            return data;
        }
    }
}