using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.facebook
{
    public class FacebookLoginRequest
    {
        
        
        public string email { get; set; }
        public string avatar { get; set; }
        public string userId { get; set; }
        public string name { get; set; }
    }
}
