using server.Helper.evaluation;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IManageEvaluationService
    {
        Task<List<EvaluationViewModel>> GetEvaluationsDecline();
        Task<bool> ChangeStatusEvaluation(EvaluationChangeStatus requesst);
    }
}
