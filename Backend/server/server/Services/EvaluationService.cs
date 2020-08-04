using Microsoft.EntityFrameworkCore;
using server.Data;
using server.enums;
using server.Helper.evaluation;
using server.Interfaces;
using server.Models;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class EvaluationService:IEvaluationService
    {
        private readonly ShopDbContext _context;
        public EvaluationService(ShopDbContext context)
        {
            _context = context;
        }

        public async Task<int> Create(EvaluationCreateRequest request)
        {
            var isAdmin = await _context.Users.Where(x => x.Id == request.userId).FirstOrDefaultAsync();
            if(isAdmin.displayname == "Admin")
            {
                var evaluation = new Evaluation()
                {
                    rating = request.rating,
                    title = request.title,
                    content = request.content,
                    status = EvaluationStatus.Confirm,
                    productId = request.productId,
                    createDate = DateTime.Now,
                    userId = request.userId,
                };
                _context.evaluations.Add(evaluation);
                await _context.SaveChangesAsync();
                return evaluation.id;
            }
            else
            {
                var evaluation = new Evaluation()
                {
                    rating = request.rating,
                    title = request.title,
                    content = request.content,
                    status = EvaluationStatus.Decline,
                    productId = request.productId,
                    createDate = DateTime.Now,
                    userId = request.userId,
                };
                _context.evaluations.Add(evaluation);
                await _context.SaveChangesAsync();
                return evaluation.id;
            }
            
        }

        public async Task<EvaluationViewModel> getEvaluationById(int evaluationId)
        {
            var evaluation = await _context.evaluations
                .Include(rp => rp.Replies)
                .Select(rs => new EvaluationViewModel()
                {
                    id = rs.id,
                    title = rs.title,
                    content = rs.content,
                    Replies = rs.Replies.Where(r => r.status == ActionStatus.Display).ToList(),
                    createDate = rs.createDate,
                    productId = rs.productId,
                    product = rs.product,
                    rating = rs.rating,
                    status = rs.status,
                    userId = rs.userId,
                    user = rs.user,
                })
                .FirstOrDefaultAsync(x => x.id == evaluationId);

            return evaluation;
        }

        public async Task<List<EvaluationViewModel>> getEvaluationsByProductId(int productId)
        {
            var evaluations = await _context.evaluations.Where(eva => eva.productId == productId && eva.status == EvaluationStatus.Confirm)
                .Include(rp => rp.Replies)
                .Select(rs => new EvaluationViewModel
                {
                    id = rs.id,
                    title = rs.title,
                    content = rs.content,
                    //Replies = rs.Replies.Where(r => r.status == ActionStatus.Display).ToList(),
                    Replies = _context.replies.Where(r => r.status == ActionStatus.Display && r.evaluationId == rs.id).ToList(),
                    createDate = rs.createDate,
                    productId = rs.productId,
                    product = rs.product,
                    rating = rs.rating,
                    status = rs.status,
                    userId = rs.userId,
                    user = rs.user,
                }).ToListAsync();
            return evaluations;
        }
    }
}
