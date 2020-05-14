using server.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.provider
{
    public class ProviderUpdateRequest
    {
        public int id { get; set; }
        public string name { get; set; }
        
        public ActionStatus status { get; set; }
    }
}
