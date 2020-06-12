using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.evaluation
{
    public class EvaluationCreateRequest
    {
        public int rating { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        
        //foreign key
        public int productId { get; set; }
        
        //foreign key
        public Guid userId { get; set; }
    }
}
