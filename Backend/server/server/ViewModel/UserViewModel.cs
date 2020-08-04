using server.enums;
using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.ViewModel
{
    public class UserViewModel
    {
        public Guid id { get; set; }
        public string displayname { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string avatar { get; set; }
        public bool gender { get; set; }
        public DateTime birthDay { get; set; }
        public ActionStatus status { get; set; }
        //relative n - 1
        public virtual ICollection<Order> Orders { get; set; }
        //
        public string userType { get; set; }
    }
}
