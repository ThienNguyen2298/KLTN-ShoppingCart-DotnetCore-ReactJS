using server.Helper.reply;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IReplyService
    {
        Task<int> Create(ReplyCreateRequest request);
        Task<ReplyViewModel> getReplyById(int replyId);
    }
}
