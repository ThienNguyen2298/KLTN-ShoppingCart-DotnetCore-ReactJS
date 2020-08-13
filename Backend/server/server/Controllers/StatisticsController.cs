using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Helper;
using server.Helper.statistics;
using server.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;
        public StatisticsController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }
        [HttpPost]
        public IActionResult RevenueStatistics(RevenueStatisticsRequest request)
        {
            var data = _statisticsService.RevenueStatistics(request);
            return Ok(data);
        }
        [HttpPost("ProductStatistics")]
        public IActionResult ProductStatistics(ProductStatisticsRequest request)
        {
            var data = _statisticsService.ProductStatistics(request);
            return Ok(data);
        }
        [HttpGet("StatusOrderStatistics")]
        public IActionResult StatusOrderStatistics()
        {
            return Ok(_statisticsService.StatusOrderStatistics());

        }
        [HttpPost("GetListProductStatistic")]
        public IActionResult GetListProductStatistic(ProductStatisticSearchRequest request)
        {
            var data = _statisticsService.GetListProduct(request);
            return Ok(data);
        }
        [HttpPost("GetListProductOrderStatistic")]
        public IActionResult GetListProductOrderStatistic(ProductStatisticSearchRequest request)
        {
            var data = _statisticsService.GetListProductOrder(request);
            return Ok(data);
        }

    }
}