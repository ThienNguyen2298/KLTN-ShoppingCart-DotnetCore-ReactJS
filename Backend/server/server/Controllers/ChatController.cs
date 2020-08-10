using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using server.Helper.chat;
using server.Hubs;
using server.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly IChatService _chatService;
        public ChatController([NotNull]IHubContext<ChatHub> hubContext, IChatService chatService)
        {
            _hubContext = hubContext;
            _chatService = chatService;
        }
        /*[HttpPost("SendMessage")]
        public async Task<IActionResult> create(ChatCreateRequest request)
        {
            var chatId = await _chatService.CreateMessage(request);
            if(chatId == 0)
            {
                return BadRequest("Gửi tin nhắn thất bại!");
            }
            var message = await _chatService.GetMessageById(chatId);
            //await _hubContext.Clients.Client(request.senderId.ToString()).SendAsync("ReceiveMessage", message);
            //await _hubContext.Clients.All.SendAsync("ReceiveMessage", message);
            //await _hubContext.Clients.Client(message.receiver.UserName).SendAsync("ReceiveMessage", message);

            return Ok("Gửi tin nhắn thành công!");
        }*/
        [HttpPost("GetMessages")]
        public async Task<IActionResult> GetMessages(ChatGetMessageRequest request)
        {
            var data = await _chatService.GetMessages(request);
            return Ok(data);
        }
    }
}