using Microsoft.EntityFrameworkCore;
using server.Data;
using server.enums;
using server.Exceptions;
using server.Helper;
using server.Helper.category;
using server.Interfaces;
using server.Models;
using server.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace server.Services
{
    public class ManageCategoryService : IManageCategoryService
    {
        private readonly ShopDbContext _context;
        //constructor
        public ManageCategoryService(ShopDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(CategoryCreateRequest request)
        {
            var category = new Category()
            {
                generalityName = request.generalityName,
                name = request.name,
                status = request.status
            };
            _context.categories.Add(category);
            await _context.SaveChangesAsync();
            return category.id;
        }

        

        public async Task<List<CategoryViewModel>> GetAll()
        {

            return await _context.categories.Where(i => i.status == ActionStatus.Display).Select(rs => new CategoryViewModel
            {
                id = rs.id,
                name = rs.name,
                generalityName = rs.generalityName,
                status = rs.status,
                Products = rs.Products.Where(p => p.status == ActionStatus.Display).ToList()
            }).ToListAsync();
        }

        public async Task<CategoryViewModel> getCategoryById(int categoryId)
        {
            var category = await _context.categories.Where(i => i.status == ActionStatus.Display)
                .Select(ele => new CategoryViewModel()
                {
                    id = ele.id,
                    name = ele.name,
                    generalityName = ele.generalityName,
                    status = ele.status
                })
                .FirstOrDefaultAsync(x => x.id == categoryId);

            return category;
        }

        public async Task<int> Update(CategoryUpdateRequest request)
        {
            var category = new Category()
            {
                id = request.id,
                name = request.name,
                generalityName = request.generalityName,
                status = request.status,
                
            };

            _context.Entry(category).State = EntityState.Modified;
            return await _context.SaveChangesAsync();
        }
        public async Task<int> Delete(int categoryId)
        {
            var category = await _context.categories.FindAsync(categoryId);
            if (category == null)
            {
                throw new ShopException($"Cannot find any category to this category id {categoryId}!");
            }
            //đổi cờ ko xóa
            category.status = ActionStatus.Deleted;
            _context.Entry(category).State = EntityState.Modified;
            return await _context.SaveChangesAsync();
        }
        //
        
        

        public async Task<List<CategoryViewModel>> Search(string search)
        {
            var data = await _context.categories.ToListAsync();

            data = data.Where(ele => FormatVietnamese.convertToUnSign(ele.name.ToLower())
           .Contains(FormatVietnamese.convertToUnSign(search.ToLower())) ||
           FormatVietnamese.convertToUnSign(ele.generalityName.ToLower())
           .Contains(FormatVietnamese.convertToUnSign(search.ToLower()))
           ).ToList();

            return data.Where(i => i.status == ActionStatus.Display).Select(rs => new CategoryViewModel
            {
                id = rs.id,
                name = rs.name,
                generalityName = rs.generalityName,
                status = rs.status,
                Products = rs.Products.Where(p => p.status == ActionStatus.Display).ToList()
            }).ToList();
        }
    }
}
