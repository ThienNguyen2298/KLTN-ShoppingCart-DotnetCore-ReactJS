using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class AppRole:IdentityRole<Guid>
    {
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
