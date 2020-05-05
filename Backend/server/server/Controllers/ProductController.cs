using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Helper.product;
using server.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }
        //http://localhost:port/product/products-paging
        [HttpGet("products-paging")]
        public async Task<IActionResult> getProductByCategoryId([FromQuery]GetProductPagingRequest request)
        {
            var products = await _productService.GetAllByCategoryId(request);
            return Ok(products);
        }
    }
}