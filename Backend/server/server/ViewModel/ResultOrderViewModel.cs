using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.ViewModel
{
    public class ResultOrderViewModel
    {
        public int total { get; set; }
        public string customer { get; set; }
        public string email { get; set; }
        public bool success { get; set; }
    }
}
