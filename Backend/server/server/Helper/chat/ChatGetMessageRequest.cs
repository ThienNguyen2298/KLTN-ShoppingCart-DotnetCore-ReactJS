using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.chat
{
    public class ChatGetMessageRequest
    {
        public Guid senderId { get; set; }
        public Guid? receiverId { get; set; }
    }
}
