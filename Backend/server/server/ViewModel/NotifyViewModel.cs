using server.enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace server.ViewModel
{
    public class NotifyViewModel
    {
        public string notify { get; set; }
        public string link { get; set; }
        public Guid senderId { get; set; }
        public Guid? receiverId { get; set; }
        [DefaultValue(false)]
        public bool isViewed { get; set; }
        public NotifyStatus status { get; set; }
    }
}
