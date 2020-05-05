using server.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.category
{
    public class CategoryUpdateRequest
    {
        public int id { get; set; }
        // quần áo

        public string generalityName { get; set; }
        //áo sơ mi // quần tây

        public string name { get; set; }

        public ActionStatus status { get; set; }
    }
}
