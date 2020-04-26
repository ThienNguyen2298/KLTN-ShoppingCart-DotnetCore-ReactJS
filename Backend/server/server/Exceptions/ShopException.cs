using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Exceptions
{
    public class ShopException:Exception
    {
        public ShopException()
        {

        }
        public ShopException(string message):base(message)
        {

        }
        public ShopException(string message, Exception exception):base(message, exception)
        {

        }
    }
}
