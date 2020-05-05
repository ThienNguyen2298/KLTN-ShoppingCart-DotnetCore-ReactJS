using server.enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper.image
{
    public class ImageRequest
    {
        public string urlImage { get; set; }
        [DefaultValue(ActionStatus.Display)]
        public ActionStatus status { get; set; }
    }
}
