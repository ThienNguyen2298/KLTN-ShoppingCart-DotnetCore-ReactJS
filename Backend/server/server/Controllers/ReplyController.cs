using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Helper.reply;
using server.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReplyController : ControllerBase
    {
        private readonly IReplyService _replyService;
        public ReplyController(IReplyService replyService)
        {
            _replyService = replyService;
        }
        [HttpGet("getReplyById")]
        public async Task<IActionResult> getReplyById(int replyId)
        {
            var reply = await _replyService.getReplyById(replyId);
            return Ok(reply);
        }
        [HttpPost]
        public async Task<IActionResult> create([FromBody]ReplyCreateRequest request)
        {

            var replyId = await _replyService.Create(request);
            if (replyId == 0)
            {
                return BadRequest("Thêm phản hồi không thành công!");
            }
            var reply = await _replyService.getReplyById(replyId);
            return CreatedAtAction(nameof(getReplyById), new { id = replyId }, reply);
        }
    }
}