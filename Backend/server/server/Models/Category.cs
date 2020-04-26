using server.enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Category
    {
        public Category()
        {
            Products = new List<Product>();
        }
        [Key]
        public int id { get; set; }
        // quần áo
        [Required]
        public string generalityName { get; set; }
        //áo sơ mi // quần tây
        [Required]
        public string name { get; set; }
        [DefaultValue(ActionStatus.Display)]
        public ActionStatus status { get; set; }
        //relative n - 1
        public virtual ICollection<Product> Products { get; set; }
    }
}
