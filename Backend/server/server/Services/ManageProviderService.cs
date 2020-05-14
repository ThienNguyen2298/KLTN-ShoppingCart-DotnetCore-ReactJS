using Microsoft.EntityFrameworkCore;
using server.Data;
using server.enums;
using server.Exceptions;
using server.Helper;
using server.Helper.provider;
using server.Interfaces;
using server.Models;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class ManageProviderService : IManageProviderService
    {
        private readonly ShopDbContext _context;
        public ManageProviderService(ShopDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(ProviderCreateRequest request)
        {
            var provider = new Provider()
            {
                name = request.name,
                status = request.status
                
            };
            _context.providers.Add(provider);
            await _context.SaveChangesAsync();
            return provider.id;
        }

        public async Task<int> Delete(int providerId)
        {
            var provider = await _context.providers.FindAsync(providerId);
            if (provider == null)
            {
                throw new ShopException($"Cannot find any provider to this provider id {providerId}!");
            }
            //đổi cờ ko xóa
            provider.status = ActionStatus.Deleted;
            _context.Entry(provider).State = EntityState.Modified;
            return await _context.SaveChangesAsync();
        }

        public async Task<List<ProviderViewModel>> GetAll()
        {
            return await _context.providers.Where(i => i.status == ActionStatus.Display).Select(rs => new ProviderViewModel
            {
                id = rs.id,
                name = rs.name,
                status = rs.status,
            }).ToListAsync();
        }

        public async Task<ProviderViewModel> getProviderById(int providerId)
        {
            var provider = await _context.providers.Where(i => i.status == ActionStatus.Display)
                .Select(ele => new ProviderViewModel()
                {
                    id = ele.id,
                    name = ele.name,
                    status = ele.status
                })
                .FirstOrDefaultAsync(x => x.id == providerId);

            return provider;
        }

        public async Task<List<ProviderViewModel>> Search(string search)
        {
            var data = await _context.providers.ToListAsync();

            data = data.Where(ele => FormatVietnamese.convertToUnSign(ele.name.ToLower())
           .Contains(FormatVietnamese.convertToUnSign(search.ToLower())) 
           ).ToList();

            return data.Where(i => i.status == ActionStatus.Display).Select(rs => new ProviderViewModel
            {
                id = rs.id,
                name = rs.name,
                status = rs.status,
            }).ToList();
        }

        public async Task<int> Update(ProviderUpdateRequest request)
        {
            var provider = new Provider()
            {
                id = request.id,
                name = request.name,
                
                status = request.status,

            };

            _context.Entry(provider).State = EntityState.Modified;
            return await _context.SaveChangesAsync();
        }
    }
}
