using server.Helper.evaluation;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IEvaluationService
    {
        Task<int> Create(EvaluationCreateRequest request);
        Task<EvaluationViewModel> getEvaluationById(int evaluationId);
        Task<List<EvaluationViewModel>> getEvaluationsByProductId(int productId);
    }
}
