using server.enums;
using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.ViewModel
{
    public class ProductViewModel
    {
        
        public int id { get; set; }
        public string name { get; set; }
        public int importPrice { get; set; }
        public int price { get; set; }
        
        public int sale { get; set; }
        public string description { get; set; }
        
        public int? rating { get; set; }

        
        public ActionStatus status { get; set; }
        public Size? size { get; set; }
        public Color? color { get; set; }
        public int amount { get; set; }
        public int viewCount { get; set; }
        //foreign key
        public int? categoryId { get; set; }
        public Category category { get; set; }
        //image
        public virtual ICollection<Image> Images { get; set; }
        //
        public int? providerId { get; set; }
        public Provider provider { get; set; }
        public virtual ICollection<Evaluation> Evaluations { get; set; }
        public int totalColumns { get; set; }
    }
}
