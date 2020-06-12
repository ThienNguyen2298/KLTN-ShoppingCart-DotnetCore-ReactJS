using server.Helper.order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IOrderService
    {
        Task<int> Create(OrderCreateRequest request);
    }
}
