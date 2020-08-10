using server.Helper.chat;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IChatService
    {
        Task<int> CreateMessage(ChatCreateRequest request);
        Task<ChatViewModel> GetMessageById(int chatId);
        Task<List<ChatViewModel>> GetMessages(ChatGetMessageRequest request);
        Task<List<UserViewModel>> GetUserOnlines(List<Guid> userIds);
    }
}
