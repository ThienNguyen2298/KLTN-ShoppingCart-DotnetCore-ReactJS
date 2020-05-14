using server.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.provider
{
    public class ProviderCreateRequest
    {
        public string name { get; set; }
        
        public ActionStatus status { get; set; }
    }
}
