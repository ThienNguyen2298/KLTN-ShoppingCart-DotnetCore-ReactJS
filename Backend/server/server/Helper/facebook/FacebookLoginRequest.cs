using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.facebook
{
    public class FacebookLoginRequest
    {
        [Required]
        [StringLength(255)]
        public string facebookToken { get; set; }
    }
}
