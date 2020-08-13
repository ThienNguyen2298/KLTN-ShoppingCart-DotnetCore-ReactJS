using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Helper.order;
using server.Helper.orderDetail;
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
        [HttpGet("GetAllOrderDelivering")]
        public async Task<IActionResult> GetAllOrderDelivering()
        {
            var data = await _manageOrderService.GetAllOrderDelivering();
            return Ok(data);
        }
        [HttpGet("GetAllOrderSuccess")]
        public async Task<IActionResult> GetAllOrderSuccess()
        {
            var data = await _manageOrderService.GetAllOrderSuccess();
            return Ok(data);
        }
        [HttpGet("GetAllOrderCancelled")]
        public async Task<IActionResult> GetAllOrderCancelled()
        {
            var data = await _manageOrderService.GetAllOrderCancelled();
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
                if(flag == false)
                {
                    await _manageOrderService.SetStatusNotConfirm(request.orderId, 0);
                }
                return Ok(flag);
            }
            return Ok(result.success);
        }
        [HttpPost("CancelOrder")]
        public async Task<IActionResult> CancelOrder(CancelOrderRequest request)
        {
            var result = await _manageOrderService.CancelOrder(request);
            if (result)
            {
                var order = await _manageOrderService.GetOrderByOrderId(request.orderId);
                var customer = String.IsNullOrEmpty(order.guess) ? order.user.displayname : order.guess;
                var note = String.IsNullOrEmpty(request.note) ? $"Đơn hàng có mã {request.orderId} của bạn đã bị hủy bởi Admin!" :
                    $"Đơn hàng có mã {request.orderId} của bạn đã bị hủy bởi Admin. Do " + request.note;
                var message = new Message(new string[] { order.email }, "ONLINE SHOP - Thông Báo Khách Hàng - "
                    +customer, note);
                var flag = await _emailSender.SendMailOrderBill(message, null, 0);
                if (flag == false)
                {
                    await _manageOrderService.SetStatusNotConfirm(request.orderId, request.statusRollBack);
                }
                return Ok(flag);
            }
            return Ok(result);
        }
        [HttpPost("ConfirmSuccessOrder")]
        public async Task<IActionResult> ConfirmSuccessOrder(StatusOrderRequest request)
        {
            var data = await _manageOrderService.confirmSuccessOrder(request);
            return Ok(data);
        }
        [HttpPost("SearchProduct")]
        public async Task<IActionResult> SearchProduct(SearchOrderRequest request)
        {
            var data = await _manageOrderService.SearchOrder(request);
            return Ok(data);
        }
        [HttpPut("UpdateOrderDetail")]
        public async Task<IActionResult> UpdateOrderDetail(OrderDetailUpdateRequest request)
        {
            var data = await _manageOrderService.UpdateOrderDetail(request);
            return Ok(data);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderDetail(int id)
        {
            var data = await _manageOrderService.DeleteOrderDetail(id);
            return Ok(data);
        }
        [HttpDelete("UserCancelOrder/{id}")]
        public async Task<IActionResult> UserCancelOrder(int id)
        {
            var data = await _manageOrderService.UserCancelOrder(id);
            return Ok(data);
        }
    }
}