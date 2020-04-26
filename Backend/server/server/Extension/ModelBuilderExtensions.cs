using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Extension
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
                new Category
                {
                    id= 1,
                    generalityName="Quần áo",
                    name = "Áo sơ mi",
                    status = enums.ActionStatus.Display
                },
                new Category
                {
                    id=2,
                    generalityName = "Quần áo",
                    name = "Quần tây",
                    status = enums.ActionStatus.Display
                },
                new Category
                {
                    id = 3,
                    generalityName = "Quần áo",
                    name = "Áo thun",
                    status = enums.ActionStatus.Display
                },
                new Category
                {
                    id = 4,
                    generalityName = "Quần áo",
                    name = "Quần kaki",
                    status = enums.ActionStatus.Display
                }
            );
            //Provider
            modelBuilder.Entity<Provider>().HasData( new Provider { id = 1, name = "Việt Tiến", status= enums.ActionStatus.Display},
                new Provider { id = 2, name = "Cty May Sông Hồng", status = enums.ActionStatus.Display },
                new Provider { id = 3, name = "Cty May Nhà Bè", status = enums.ActionStatus.Display },
                new Provider { id = 4, name = "Cty Giditex", status = enums.ActionStatus.Display },
                new Provider { id = 5, name = "Cty Vinatex", status = enums.ActionStatus.Display }
                );
            //Product
            modelBuilder.Entity<Product>().HasData( new Product { id = 1, name="Áo sơ mi", importPrice=100000, price = 150000,
                
                rating = 5, description="mô tả sản phẩm 1" , status= enums.ActionStatus.Display, color = Color.blue, size = Size.L,categoryId = 1,
             providerId = 1},
             new Product
             {
                 id = 2,
                 name = "Áo sơ mi tay ngắn",
                 importPrice = 80000,
                 price = 120000,
                 rating = 5,
                
                 description = "mô tả sản phẩm 2",
                 status = enums.ActionStatus.Display,
                 color = Color.red,
                 size = Size.X,
                 categoryId = 1,
                 providerId = 2
             },
             new Product
             {
                 id = 3,
                 name = "Quần tây",
                 importPrice = 200000,
                 price = 250000,
                 rating = 5,
                 
                 description = "mô tả sản phẩm 3",
                 status = enums.ActionStatus.Display,
                 color = Color.blue,
                 size = Size.L,
                 categoryId = 2,
                 providerId = 3
             },
             new Product
             {
                 id = 4,
                 name = "Áo thun",
                 importPrice = 50000,
                 price = 75000,
                 rating = 5,

                 description = "mô tả sản phẩm 4",
                 status = enums.ActionStatus.Display,
                 color = Color.black,
                 size = Size.L,
                 categoryId = 3,
                 providerId = 4
             },
             new Product
             {
                 id = 5,
                 name = "Quần kaki",
                 importPrice = 180000,
                 price = 220000,
                 rating = 5,

                 description = "mô tả sản phẩm 5",
                 status = enums.ActionStatus.Display,
                 color = Color.gray,
                 size = Size.L,
                 categoryId = 4,
                 providerId = 5
             }
                );
            // user - role
            var adminId = new Guid("4557893F-1F56-4B6F-BB3B-CAEFD62C8C49");
            var roleId = new Guid("078269D8-1A12-4592-B92E-7FF1A876A5F2");
            
            modelBuilder.Entity<AppRole>().HasData(new AppRole {
                    Id= roleId,
                    Name="Admin",
                    NormalizedName="Admin",
                    Description="Administrator role",
                },
                new AppRole
                {
                    Id = new Guid("6D9186BA-2CD6-4B6C-B729-4E605DE1019F"),
                    Name = "User",
                    NormalizedName = "User",
                    Description = "User role",
                }
            );

            var hasher = new PasswordHasher<AppUser>();
            modelBuilder.Entity<AppUser>().HasData(new AppUser
            {
                Id = adminId,
                UserName = "admin",
                NormalizedUserName = "admin",
                displayname = "Admin",
                Email = "16110472@student.hcmute.deu.vn",
                NormalizedEmail = "some-admin-email@nonce.fake",
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "Thiendeptrai@1998"),
               
                status = enums.ActionStatus.Deleted,
                SecurityStamp = string.Empty,
                birthDay = new DateTime(1998, 02, 02)
            });

            modelBuilder.Entity<IdentityUserRole<Guid>>().HasData(new IdentityUserRole<Guid>
            {
                RoleId = roleId,
                UserId = adminId
            });


        }
    }
}
