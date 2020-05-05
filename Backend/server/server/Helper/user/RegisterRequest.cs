using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.user
{
    public class RegisterRequest
    {
        
        public string displayname { get; set; }

        public string email { get; set; }
        public string password { get; set; }
    }
}
