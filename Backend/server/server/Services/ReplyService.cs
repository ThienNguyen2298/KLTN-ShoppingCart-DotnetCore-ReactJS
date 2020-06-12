using Microsoft.EntityFrameworkCore;
using server.Data;
using server.enums;
using server.Helper.reply;
using server.Interfaces;
using server.Models;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class ReplyService : IReplyService
    {
        private readonly ShopDbContext _context;
        public ReplyService(ShopDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(ReplyCreateRequest request)
        {
            var reply = new Reply()
            {
                content = request.content,
                evaluationId = request.evaluationId,
                status = enums.ActionStatus.Display,
                createDate = DateTime.Now,
                userId = request.userId,
            };
            _context.replies.Add(reply);
            await _context.SaveChangesAsync();
            return reply.id;
        }

        public async Task<ReplyViewModel> getReplyById(int replyId)
        {
            var reply = await _context.replies.Where(e => e.status == ActionStatus.Display).Include(u => u.user)
                .Select(rs => new ReplyViewModel()
                {
                    id = rs.id,
                    content = rs.content,
                    evaluationId = rs.evaluationId,
                    
                    createDate = rs.createDate,
                    status = rs.status,
                    userId = rs.userId,
                    user = rs.user,
                })
                .FirstOrDefaultAsync(x => x.id == replyId);

            return reply;
        }
    }
}
