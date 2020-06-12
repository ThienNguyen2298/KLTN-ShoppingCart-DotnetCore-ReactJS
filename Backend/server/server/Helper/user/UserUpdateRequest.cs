using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.user
{
    public class UserUpdateRequest
    {
        public Guid id { get; set; }
        public string displayname { get; set; }
        public string phone { get; set; }
        public IFormFile file { get; set; }
        public string avatar { get; set; }
        public string address { get; set; }
        public bool gender { get; set; }
        public DateTime birthDay { get; set; }
    }
}
