using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            return Ok(new { data = products.products, totalColumns = products.totalColumns });
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
        [HttpGet("search-products")]
        public async Task<IActionResult> searchProducts([FromQuery]SearchProductRequest request)
        {
            List<ProductViewModel> products = await _productService.SearchProducts(request);
            List<CategoryViewModel> catetegories = null;
            if(products != null)
            {
                catetegories = await _productService.getListCategoryByGeneralityName(products[0].category.generalityName);
            }
            return Ok(new { products = products, categories = catetegories == null ? null : catetegories});
        }
        [HttpGet("get-listcategory-by-generalityname/{generalityName}")]
        public async Task<IActionResult> getListCategoryByGeneralityName(string generalityName)
        {
            var listCategory = await _productService.getListCategoryByGeneralityName(generalityName);
            return Ok(listCategory);
        }
        [HttpPost("Paging")]
        public async Task<IActionResult> Paging(ProductPagingRequest request)
        {
            var data = await _productService.Paging(request);
            return Ok(data);
        }
    }
}