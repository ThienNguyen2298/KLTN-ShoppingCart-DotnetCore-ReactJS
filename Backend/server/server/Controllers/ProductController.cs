using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.ViewModel;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        public readonly IManageProductService _manageProductService;
        public ProductController(IManageProductService manageProductService)
        {
            _manageProductService = manageProductService;
        }
        [HttpGet]
        public async Task<List<ProductViewModel>> getAll()
        
        {
            var data = await _manageProductService.GetAll();
            return data;
        }
    }
}