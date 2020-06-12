using server.enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Evaluation
    {
        public Evaluation()
        {
            Replies = new List<Reply>();
        }
        public int id { get; set; }
        public int rating { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        [DefaultValue(EvaluationStatus.Confirm)]
        public EvaluationStatus status { get; set; }
        public DateTime createDate { get; set; }
        //foreign key
        public int productId { get; set; }
        public Product product { get; set; }
        //foreign key
        public Guid userId { get; set; }
        public AppUser user { get; set; }
        public virtual ICollection<Reply> Replies { get; set; }
    }
}
