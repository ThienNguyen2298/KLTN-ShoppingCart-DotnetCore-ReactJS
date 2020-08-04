using Microsoft.EntityFrameworkCore;
using server.Data;
using server.enums;
using server.Helper.evaluation;
using server.Interfaces;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class ManageEvaluationService : IManageEvaluationService
    {
        private readonly ShopDbContext _context;
        public ManageEvaluationService(ShopDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ChangeStatusEvaluation(EvaluationChangeStatus request)
        {
            var evaluation = await _context.evaluations.Where(x => x.id == request.id).FirstOrDefaultAsync();
            evaluation.status = request.status;
            _context.Entry(evaluation).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<EvaluationViewModel>> GetEvaluationsDecline()
        {
            return await _context.evaluations.Where(x => x.status == EvaluationStatus.Decline)
                .Include(y => y.user)
                .Select(rs => new EvaluationViewModel
                {
                    id = rs.id,
                    title = rs.title,
                    content = rs.content,
                    Replies = rs.Replies,
                    createDate = rs.createDate,
                    productId = rs.productId,
                    product = rs.product,
                    rating = rs.rating,
                    status = rs.status,
                    userId = rs.userId,
                    user = rs.user,
                }).ToListAsync();
        }
    }
}
