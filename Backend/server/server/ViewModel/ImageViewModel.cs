using server.enums;
using server.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace server.ViewModel
{
    public class ImageViewModel
    {
        public int id { get; set; }
        public string urlImage { get; set; }
        [DefaultValue(ActionStatus.Display)]
        public ActionStatus status { get; set; }
        public int? productId { get; set; }
        
    }
}
