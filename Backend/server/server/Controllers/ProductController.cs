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
        [HttpGet("get-all-products/{itemCount}")]
        public async Task<IActionResult> getAllProduct(int itemCount)
        {
            var products = await _productService.GetAllProduct(itemCount);
            return Ok(products);
        }
        [HttpGet("products-top-view-count/{all}")]
        public async Task<IActionResult> getTopViewCountProduct(bool all = false)
        {
            var products = await _productService.GetTopViewCountProduct(all);
            return Ok(products);
        }
        [HttpGet("get-product-by-id/{productId}")]
        public async Task<IActionResult> getProductById(int productId)
        {
            var product = await _productService.getProductById(productId);
            return Ok(product);
        }
    }
}