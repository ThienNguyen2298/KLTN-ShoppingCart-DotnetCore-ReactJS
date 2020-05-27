using Microsoft.AspNetCore.Http;
using server.enums;
using server.Helper.image;
using server.Models;
using server.ViewModel;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;

namespace server.Helper
{
    public class ProductCreateRequest
    {
        
        public string name { get; set; }
        public int importPrice { get; set; }
        public int price { get; set; }

        public int sale { get; set; }
        public string description { get; set; }

        public ActionStatus status { get; set; }
        public Size? size { get; set; }
        public Color? color { get; set; }
        public int amount { get; set; }
        //
        
        public IEnumerable<IFormFile> images { get; set; }
        //foreign key
        public int? categoryId { get; set; }
        //
        public int? providerId { get; set; }
        
    }
}
