using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Helper.evaluation;
using server.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManageEvaluationController : ControllerBase
    {
        private readonly IManageEvaluationService _manageEvaluation;
        public ManageEvaluationController(IManageEvaluationService manageEvaluation)
        {
            _manageEvaluation = manageEvaluation;
        }
        [HttpGet("GetEvaluationsDecline")]
        public async Task<IActionResult> GetEvaluationsDecline()
        {
            var data = await _manageEvaluation.GetEvaluationsDecline();
            return Ok(data);
        }
        [HttpPost("ConfirmEvaluation")]
        public async Task<IActionResult> ConfirmEvaluation(EvaluationChangeStatus request)
        {
            var check = await _manageEvaluation.ChangeStatusEvaluation(request);
            return Ok(check);
        }
        [HttpPost("DeleteEvaluation")]
        public async Task<IActionResult> DeleteEvaluation(EvaluationChangeStatus request)
        {
            var check = await _manageEvaluation.ChangeStatusEvaluation(request);
            return Ok(check);
        }
    }
}