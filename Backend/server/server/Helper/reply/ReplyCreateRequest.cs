using server.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.reply
{
    public class ReplyCreateRequest
    {
        public string content { get; set; }
        
        
        
        //foreign key
        public Guid userId { get; set; }
        
        //foreign key
        public int evaluationId { get; set; }
        
    }
}
