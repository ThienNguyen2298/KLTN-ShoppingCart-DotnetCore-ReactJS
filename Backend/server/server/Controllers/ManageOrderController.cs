using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Helper.order;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManageOrderController : ControllerBase
    {
        private readonly IManageOrderService _manageOrderService;
        private readonly IEmailSender _emailSender;
        public ManageOrderController(IManageOrderService manageOrderService, IEmailSender emailSender)
        {
            _manageOrderService = manageOrderService;
            _emailSender = emailSender;
        }
        [HttpGet("GetAllOrderNotConfirm")]
        public async Task<IActionResult> GetAllOrderNotConfirm()
        {
            var data = await _manageOrderService.GetAllOrderNotConfirm();
            return Ok(data);
        }
        [HttpGet("GetOrderDetailByOrderId")]
        public async Task<IActionResult> GetOrderDetailByOrderId(int orderId)
        {
            var result = await _manageOrderService.GetOrderDetailByOrderId(orderId);
            return Ok(result);
        }
        [HttpPost("ConfirmShippingAndSendMailBillOrder")]
        public async Task<IActionResult> ConfirmShippingAndSendMailBillOrder(StatusOrderRequest request)
        {
            var result = await _manageOrderService.confirmShippingAndSendMailBillOrder(request);
            if (result.success)
            {
                var listData = await _manageOrderService.GetOrderDetailByOrderId(request.orderId);
                var message = new Message(new String[] { result.email }, "ONLINE SHOP - Hóa Đơn Khách Hàng - " + result.customer, string.Empty);
                var flag = await _emailSender.SendMailOrderBill(message, listData, result.total);
                return Ok(flag);
            }
            return Ok(result.success);
        }
        [HttpPost("CancelOrder")]
        public async Task<IActionResult> CancelOrder(StatusOrderRequest request)
        {
            var result = await _manageOrderService.CancelOrder(request);
            return Ok(result);
        }
        
    }
}