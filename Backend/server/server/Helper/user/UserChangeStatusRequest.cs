using server.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.user
{
    public class UserChangeStatusRequest
    {
        public Guid id { get; set; }
        public ActionStatus status { get; set; }
    }
}
