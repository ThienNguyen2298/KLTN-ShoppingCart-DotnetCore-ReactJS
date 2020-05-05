using server.enums;
using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.ViewModel
{
    public class CategoryViewModel
    {
        public int id { get; set; }
        // quần áo
        
        public string generalityName { get; set; }
        //áo sơ mi // quần tây
        
        public string name { get; set; }
        
        public ActionStatus status { get; set; }
        //relative n - 1
        public virtual ICollection<Product> Products { get; set; }
    }
}
