using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Helper.order;
using server.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        public readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpPost]
        public async Task<IActionResult> create([FromBody]OrderCreateRequest request)
        {

            var orderId = await _orderService.Create(request);
            if (orderId == 0)
            {
                return BadRequest("Đặt hàng thất bại!");
            }
            return Ok("Đặt hàng thành công! Admin sẽ thông báo đến bạn thông qua số điện thoại hoặc gmail! Trân trọng!");
        }
    }
}