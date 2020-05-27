using Microsoft.AspNetCore.Http;
using server.enums;
using server.Models;
using server.ViewModel;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.product
{
    public class ProductUpdateRequest
    {
        public int id { get; set; }
        public string name { get; set; }
        public int importPrice { get; set; }
        public int price { get; set; }
        public int rating { get; set; }
        public int sale { get; set; }
        public string description { get; set; }

        public ActionStatus status { get; set; }
        public Size? size { get; set; }
        public Color? color { get; set; }
        public int amount { get; set; }
        public int viewCount { get; set; }
        public IEnumerable<int> images { get; set; }
        public IEnumerable<IFormFile> files { get; set; }
        //foreign key
        public int? categoryId { get; set; }
        //
        public int? providerId { get; set; }
    }
}
