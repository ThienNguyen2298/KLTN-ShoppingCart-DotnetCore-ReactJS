using server.Models;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IEmailSender
    {
        Task<bool> SendMailOrderBill(Message message, List<OrderDetailViewModel> listData, int total);
    }
}
