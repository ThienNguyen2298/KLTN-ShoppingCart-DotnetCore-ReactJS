using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.chat
{
    public class ChatCreateRequest
    {
        
        public string connectionId { get; set; }
        
        public string content { get; set; }
        public Guid senderId { get; set; }
        public Guid? receiverId { get; set; }

    }
}
